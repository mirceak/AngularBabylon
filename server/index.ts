import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as jwt from 'jsonwebtoken';

import setMongo from './mongo';
import tunnel from '../client/src/tunnel';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import * as https from 'https';
import { readFileSync } from 'fs';
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

io.on('connection', async (socket: Socket) => {
  console.log('client connected to socket');
  var p1;
  var ph2;
  var ph3;
  var userHash;
  var fullHash;
  var rsaKeys_0;
  var rsaEncryptedAesKey;
  var rsaPubkData;
  var hCryptKeys;

  socket.on('startSession', async (data) => {
    p1 = data.email;
    await User.SchemaUser.findOne({ email: p1 }, async (err, user) => {
      if (!user) {
        socket.disconnect();
        return err;
      }
      ph2 = user.username;
      ph3 = user.password;

      hCryptKeys = await tunnel.generateHCryptKeys();
      rsaPubkData = data.rsaPubkData;
      rsaKeys_0 = await tunnel.generateRsaKeys(subtle);
      rsaEncryptedAesKey = await tunnel.getRsaEncryptedAesKey(subtle, rsaPubkData);
      userHash = await tunnel.getShaHash(
        subtle,
        JSON.stringify({
          initialRsaPubkData: data.rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        })
      );
      var aesEncrypted = await tunnel.aesEncrypt(subtle, JSON.stringify({ rsaPubkData: rsaKeys_0.pubkData, hCryptPubkData: hCryptKeys.pubkData }), rsaEncryptedAesKey.aesKey, userHash);
      socket.emit('requestHomomorphic', {
        rsaEncryptedAesKey: rsaEncryptedAesKey.rsaEncryptedAes,
        aesEncrypted: aesEncrypted.ciphertext,
      });
    });
  });

  socket.on('sendHomomorphic', async (data) => {
    fullHash = (
      await tunnel.getShaHash(
        subtle,
        JSON.stringify({
          username: ph2,
          password: ph3,
          initialRsaPubkData: rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        })
      )
    ).substr(0, 6);
    var totalHash = await tunnel.getShaHash(
      subtle,
      JSON.stringify({
        fullHash: fullHash,
        userHash: userHash,
        rsaPubkData: data.rsaPubkData,
        rsaEncryptedAesKey: new TextDecoder().decode(data.rsaEncryptedAesKey),
      })
    );
    var rsaDecryptedAesKey = await tunnel.rsaDecrypt(subtle, data.rsaEncryptedAesKey, rsaKeys_0.privateKey);
    var aesKey = await tunnel.importAesKey(subtle, rsaDecryptedAesKey);
    var aesDecrypted = await tunnel.aesDecrypt(subtle, data.aesEncrypted, aesKey, totalHash);
    var _tunnel = JSON.parse(aesDecrypted);
    _tunnel = {
      lock: tunnel.fromString(_tunnel.tunnelLock),
      dataLock: tunnel.fromString(_tunnel.tunnelDataLock),
    };
    var rsaEncryptedAesKeyHash = await tunnel.getShaHash(subtle, data.rsaEncryptedAes);
    var hCryptCipherData = tunnel.unlock(_tunnel, [userHash, fullHash, rsaEncryptedAesKeyHash, totalHash]);
    var decripted = await tunnel.hCryptDecrypt(hCryptKeys, hCryptCipherData);
    console.log(new TextDecoder().decode(decripted))
  });

  socket.on('injectCodeInServer', (data) => {
    socket.emit('injectCodeInClient', { a: 'helow' });
  });

  socket.on('disconnect', (data) => {
    console.log('disconnected');
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
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true, parameterLimit: 15000 }));
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
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
  } catch (err) {
    console.error(err);
  }
}

main();
