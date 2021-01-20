import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import setMongo from './mongo';
import tunnel from '../client/src/tunnel';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import * as User from './entities/user/schema/schema.user';

import * as SEAL from 'node-seal'

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
(async (SEAL)=>{ 
  /* @ts-ignore fuyck yaaya fuyck you seal sheit call*/ 
  const seal = await SEAL();
  const schemeType = seal.SchemeType.bfv;
  const securityLevel = seal.SecurityLevel.tc128;
  const polyModulusDegree = 4096;
  const bitSizes = [36, 36, 37];
  const bitSize = 20;
  const parms = seal.EncryptionParameters(schemeType);
  // Set the PolyModulusDegree
  parms.setPolyModulusDegree(polyModulusDegree);
  // Create a suitable set of CoeffModulus primes
  parms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
  // Set the PlainModulus to a prime of bitSize 20.
  parms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));
  const context = seal.Context(
    parms, // Encryption Parameters
    true, // ExpandModChain
    securityLevel // Enforce a security level
  );
  if (!context.parametersSet()) {
    throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.');
  }
  const encoder: any = seal.BatchEncoder(context);
  const keyGenerator = seal.KeyGenerator(context);
  const publicKey = keyGenerator.createPublicKey();
  const secretKey = keyGenerator.secretKey();
  const encryptor = seal.Encryptor(context, publicKey);
  const decryptor = seal.Decryptor(context, secretKey);
  const evaluator = seal.Evaluator(context);
  // Create data to be encrypted
  const array = Int32Array.from([1, 2, 3, 4, 5]);
  // Encode the Array
  const plainText: any = encoder.encode(array);
  const array1 = Int32Array.from([1]);
  // Encode the Array
  const plainText1: any = encoder.encode(array1);
  // console.log(encoder.decode(plainText));
  // Encrypt the PlainText
  const cipherText: any = encryptor.encrypt(plainText);
  // console.log(cipherText.save());
  // Add the CipherText to itself and store it in the destination parameter (itself)
  evaluator.addPlain(cipherText, plainText1, cipherText); // Op (A), Op (B), Op (Dest)
  // Or create return a new cipher with the result (omitting destination parameter)
  // const cipher2x = evaluator.add(cipherText, cipherText)
  // Decrypt the CipherText
  const decryptedPlainText = decryptor.decrypt(cipherText);
  // Decode the PlainText
  const decodedArray = encoder.decode(decryptedPlainText);
  console.log('decodedArray', decodedArray);

})(SEAL)
const { subtle, getRandomValues } = require('crypto').webcrypto;

// io.on('connection', async (socket: Socket) => {
//   console.log('client connected to socket');
//   var p1;
//   var ph2;
//   var ph3;

//   socket.on('startSession', async (data) => {
//     p1 = data.email;
//     await SchemaUser.findOne({ email: p1 }, async (err, user) => {
//       if (!user) {
//         socket.disconnect();
//         return err;
//       }
//       ph2 = user.username;
//       ph3 = user.password;

//       socket.emit('injectCodeInClient', { a: 'helow' });
//     });
//   });

//   socket.on('injectCodeInServer', (data) => {
//     socket.emit('injectCodeInClient', { a: 'helow' });
//   });

//   socket.on('disconnect', (data) => {
//     console.log('disconnected');
//   });
// });

var email;
var password;
var pubkLock;
var onTunnel = async (req, res) => {
  email = req.body.email;
  await User.default.SchemaUser.findOne({ email: email }, async (err, user) => {
    if (!user) {
      res.send({
        error: 'no user found',
      });
    }
    password = user.password;
    pubkLock = await tunnel.makePubkLock(password, req.body.pubkData, subtle);
    res.send({
      pubkLock: pubkLock,
    });
  });
};
var onLock = async (req, res) => {
  // email = req.body.email;
  // var lock = req.body.lock;

  // var str = tunnel.unlockMessage(
  //   tunnel.unlockMessage(tunnel.unlock(lock.lock, email), lock.dataLock).substring(offset, lock.lock.length - offset),
  //   lock.dataLock
  // );
  // var decrypted: any = await decrypt(toArrayBuffer(str.split(',')), serverKeys.privateKey, 'test');
  // res.send({
  //   lock: decrypted,
  // });
};
function toArrayBuffer(arr) {
  var buf = new ArrayBuffer(arr.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = arr.length; i < strLen; i++) {
    bufView[i] = arr[i];
  }
  return buf;
}

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

    app.post('/utils/tunnel', onTunnel);
    app.post('/utils/onLock', onLock);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}

main();
