import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import setMongo from './mongo';
import tunnel from '../client/src/tunnel';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import User from './entities/user/schema/schema.user';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
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
  var homoKeys;
  
  socket.on('startSession', async (data) => {
    p1 = data.email;
    await User.SchemaUser.findOne({ email: p1 }, async (err, user) => {
      if (!user) {
        socket.disconnect();
        return err;
      }
      ph2 = user.username;
      ph3 = user.password;

      var rsaPubkData = data.rsaPubkData;
      var rsaKeys_0 = await tunnel.generateRsaKeys(subtle);
      var rsaEncryptedAesKey = await tunnel.getRsaEncryptedAesKey(subtle, rsaPubkData);
      homoKeys = await tunnel.generateHomoKeys();
      //also send lock
      //unlock homomorphic encripted data with a lock version(index)
      //client will send index and lock through homomorphic ciphers
      var aesEncrypted = await tunnel.aesEncrypt(
        subtle,
        JSON.stringify({
          hash: await tunnel.getShaHash(subtle, JSON.stringify({ email: user.email, username: ph2, initialRsaPubkData: rsaPubkData })),
          homoPubkData: homoKeys.pubkData
        }),
        rsaEncryptedAesKey.aesKey
      );
      socket.emit('requestHomomorphic', {
        rsaPubkData: rsaKeys_0.pubkData,
        rsaEncryptedAesKey: rsaEncryptedAesKey.rsaEncryptedAes,
        aesEncrypted: aesEncrypted.ciphertext,
      });
    });
  });

  socket.on('sendHomomorphic', async (data) => {    
    var decripted = await tunnel.homoDecrypt(homoKeys, data.homoEncrypted);
    console.log(new TextDecoder().decode(decripted))
  });

  socket.on('injectCodeInServer', (data) => {
    socket.emit('injectCodeInClient', { a: 'helow' });
  });

  socket.on('disconnect', (data) => {
    console.log('disconnected');
  });
});

httpServer.listen(3030);

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true, parameterLimit: 15000 }));
async function main(): Promise<any> {
  try {
    await setMongo();

    app.set('port', 3000);
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

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}

main();
