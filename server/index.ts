import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as jwt from 'jsonwebtoken';

import setMongo from './mongo';
import cipher from '../client/src/cipher';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import * as https from 'https';
import { readFileSync, writeFileSync } from 'fs';
import { Server, Socket } from 'socket.io';

import User from './entities/user/schema/schema.user';
const httpsSocketServer = https
  .createServer({
    key: readFileSync('./server/certs/https.key', 'utf-8'),
    cert: readFileSync('./server/certs/https.cert', 'utf-8'),
  })
  .listen(3030, () => {
    console.log('Listening for socket requests...');
  });
const io = new Server(httpsSocketServer, {
  cors: {
    origin: ['https://talky.ro', 'https://www.talky.ro'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const { subtle, getRandomValues } = require('crypto').webcrypto;

var jwtSessionTokenAesKey;
var generateAesKey = async () => {
  jwtSessionTokenAesKey = await cipher.generateAesKey(subtle);
  writeFileSync('./server/certs/jwtSessionTokenAesKey.json', Buffer.from(new TextEncoder().encode(jwtSessionTokenAesKey.pubkData)));
};
try {
  jwtSessionTokenAesKey = readFileSync('./server/certs/jwtSessionTokenAesKey.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenAesKey || !jwtSessionTokenAesKey.length) {
    await generateAesKey();
  }
  jwtSessionTokenAesKey = readFileSync('./server/certs/jwtSessionTokenAesKey.json', 'utf-8');
  jwtSessionTokenAesKey = await cipher.importAesKey(subtle, jwtSessionTokenAesKey);
})();

var jwtSessionTokenElipticKey;
var generateElipticKey = async () => {
  jwtSessionTokenElipticKey = await cipher.generateElipticKey(subtle);
  writeFileSync(
    './server/certs/jwtSessionTokenElipticKey.json',
    Buffer.from(new TextEncoder().encode(jwtSessionTokenElipticKey.privkData))
  );
};
try {
  jwtSessionTokenElipticKey = readFileSync('./server/certs/jwtSessionTokenElipticKey.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenElipticKey || !jwtSessionTokenElipticKey.length) {
    await generateElipticKey();
  }
  jwtSessionTokenElipticKey = readFileSync('./server/certs/jwtSessionTokenElipticKey.json', 'utf-8');
  jwtSessionTokenElipticKey = await cipher.importElipticKey(subtle, jwtSessionTokenElipticKey);
})();

var jwtSessionTokenRsaKeys;
var generateRsaKey = async () => {
  jwtSessionTokenRsaKeys = await cipher.generateRsaKeys(subtle, 'jwk');
  writeFileSync(
    './server/certs/jwtSessionTokenRsaKeys.json',
    Buffer.from(
      new TextEncoder().encode(JSON.stringify({ privkData: jwtSessionTokenRsaKeys.privkData, pubkData: jwtSessionTokenRsaKeys.pubkData }))
    )
  );
};
try {
  jwtSessionTokenRsaKeys = readFileSync('./server/certs/jwtSessionTokenRsaKeys.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenRsaKeys || !jwtSessionTokenRsaKeys.length) {
    await generateRsaKey();
  }
  jwtSessionTokenRsaKeys = readFileSync('./server/certs/jwtSessionTokenRsaKeys.json', 'utf-8');
  jwtSessionTokenRsaKeys = JSON.parse(jwtSessionTokenRsaKeys);
  jwtSessionTokenRsaKeys.publicKey = await cipher.importRsaKey(subtle, jwtSessionTokenRsaKeys.pubkData, true);
  jwtSessionTokenRsaKeys.privateKey = await cipher.importRsaKey(subtle, jwtSessionTokenRsaKeys.privkData);
})();
io.on('connection', async (socket: Socket) => {
  console.log('client connected to socket');

  socket.on('startSession', async (data) => {
    const p1 = data.email;
    await User.SchemaUser.findOne({ email: p1 }, async (err, user) => {
      if (!user) {
        socket.disconnect();
        return err;
      }
      const ph2 = user.username;
      const ph3 = user.password;

      const rsaPubkData = data.rsaPubkData;
      const rsaKeys_0 = await cipher.generateRsaKeys(subtle, 'jwk');
      const rsaEncryptedAesKey = await cipher.getRsaEncryptedAesKey(subtle, rsaPubkData);
      const userHash = await cipher.getShaHash(
        subtle,
        JSON.stringify({
          initialRsaPubkData: data.rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        })
      );
      var fullHash = await cipher.getShaHash(
        subtle,
        await cipher.getShaHash(
          subtle,
          JSON.stringify({
            username: ph2,
            password: ph3,
            initialRsaPubkData: rsaPubkData,
            initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
          }).substr(0, 6)
        )
      );
      var totalHash = await cipher.getShaHash(
        subtle,
        await cipher.getShaHash(
          subtle,
          JSON.stringify({
            userHash: userHash,
            fullHash: fullHash,
          })
        )
      );
      var aesEncrypted = await cipher.aesEncrypt(
        subtle,
        JSON.stringify({ rsaPubkData: rsaKeys_0.pubkData }),
        rsaEncryptedAesKey.aesKey,
        totalHash
      );
      var jwtToken = await jwt.sign(
        {
          user: {
            email: p1,
          },
          totalHash: totalHash,
          fullHash: fullHash,
          userHash: userHash,
          rsaKeys_0: rsaKeys_0.privkData,
        },
        jwtSessionTokenElipticKey,
        { algorithm: 'ES512' }
      );
      var aesIv = new TextDecoder().decode(getRandomValues(new Uint32Array(12)));
      var rsaEncryptedAesIv = await cipher.rsaEncrypt(subtle, aesIv, jwtSessionTokenRsaKeys.publicKey);
      var aesEncryptedJwtToken = await cipher.aesEncrypt(subtle, jwtToken, jwtSessionTokenAesKey, aesIv);
      socket.emit('preLogin', {
        jwt: {
          aesToken: aesEncryptedJwtToken.ciphertext,
          rsaIv: rsaEncryptedAesIv,
        },
        rsaEncryptedAesKey: rsaEncryptedAesKey.rsaEncryptedAes,
        aesEncrypted: aesEncrypted.ciphertext,
      });
    });
  });

  socket.on('login', async (data) => {
    var jwtToken = data.jwt;
    jwtToken.rsaIv = await cipher.rsaDecrypt(subtle, jwtToken.rsaIv, jwtSessionTokenRsaKeys.privateKey);
    jwtToken.data = await cipher.aesDecrypt(subtle, jwtToken.aesToken, jwtSessionTokenAesKey, jwtToken.rsaIv);
    jwtToken.data = await jwt.verify(jwtToken.data, jwtSessionTokenElipticKey, { algorithms: ['ES512'] });

    jwtToken.data.rsaKeys_0 = await cipher.importRsaKey(subtle, jwtToken.data.rsaKeys_0);
    var finalHash = await cipher.getShaHash(
      subtle,
      JSON.stringify({
        totalHash: jwtToken.data.totalHash,
        fullHash: jwtToken.data.fullHash,
        userHash: jwtToken.data.userHash,
        rsaPubkData: data.rsaPubkData,
        rsaEncryptedAesKey: new TextDecoder().decode(data.rsaEncryptedAesKey),
      })
    );
    var rsaDecryptedAesKey = await cipher.rsaDecrypt(subtle, data.rsaEncryptedAesKey, jwtToken.data.rsaKeys_0);
    var aesKey = await cipher.importAesKey(subtle, rsaDecryptedAesKey);
    var aesDecrypted = await cipher.aesDecrypt(subtle, data.aesEncrypted, aesKey, finalHash);
    var _cipher = JSON.parse(aesDecrypted);
    _cipher = {
      lock: cipher.fromString(_cipher.cipherLock),
      dataLock: cipher.fromString(_cipher.cipherDataLock),
    };
    var rsaEncryptedAesKeyHash = await cipher.getShaHash(subtle, new TextDecoder().decode(data.rsaEncryptedAesKey));
    var cipherData = cipher.unlock(_cipher, [jwtToken.data.userHash, jwtToken.data.fullHash, rsaEncryptedAesKeyHash, finalHash]);
    var json: any = JSON.parse(cipherData);

    await User.SchemaUser.findOne({ email: jwtToken.data.user.email }, async (err, user) => {
      user.comparePassword(json.password, json.username, async (error, isMatch) => {
        socket.emit(
          'loggedIn',
          await jwt.sign(
            {
              loggedIn: true,
            },
            jwtSessionTokenElipticKey,
            { algorithm: 'ES512' }
          )
        );
      });
    });
  });

  socket.on('injectCodeInServer', (data) => {
    socket.emit('injectCodeInClient', { a: 'helow' });
  });

  socket.on('disconnect', (data) => {
    console.log('disconnected', data);
  });
});

const httpApp = express();
httpApp.set('port', 80);
httpApp.use(express.json());
httpApp.use(express.urlencoded({ extended: false }));
httpApp.get('*', function (req, res) {
  res.redirect('https://' + req.headers.host + req.url);
});
httpApp.listen(httpApp.get('port'), () => console.log(`Angular Full Stack listening on port ${httpApp.get('port')}`));
const app = express();
const httpsServer = https
  .createServer(
    {
      key: readFileSync('./server/certs/https.key', 'utf-8'),
      cert: readFileSync('./server/certs/https.cert', 'utf-8'),
    },
    app
  )
  .listen(443, () => {
    console.log('Listening for http requests...');
  });
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true, parameterLimit: 15000 }));
async function main(): Promise<any> {
  try {
    await setMongo();

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', express.static(path.join(__dirname, '../../client')));
    const controllerParser = (controllers: any[]) => {
      Object.keys(controllers).map((key) => {
        let ctrl: BaseController = new controllers[key]();
        app.use('/api', ctrl.getRouter());
      });
    };
    controllerParser(Controllers);

    app.get('*', (req, res) => {
      if (req.headers.host.includes('www.')) {
        return res.redirect('https://' + req.headers.host.replaceAll(/www./g, '') + req.url);
      }
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
  } catch (err) {
    console.error(err);
  }
}

main();
