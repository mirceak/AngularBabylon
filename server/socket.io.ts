import { readFileSync } from 'fs';
import * as https from 'https';

import { jwtSessionToken, Cryptography, jwt } from './certs/jwtSessionToken/jwtSessionToken';
import { Server } from 'socket.io';
import * as UserController from './entities/user/controller/controller.user';

var sockets = [];
var registeredMessages = [];
const httpsSocketServer = https
  .createServer({
    key: readFileSync('./server/certs/https.key', 'utf-8'),
    cert: readFileSync('./server/certs/https.cert', 'utf-8'),
  })
  .listen(5050, () => {
    console.log('Listening for socket requests...');
  });
const io = new Server(httpsSocketServer, {
  transports: ['websocket', 'polling'],

  cors: {
    origin: ['https://talky.ro', 'https://www.talky.ro'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', async (socket: any) => {
  console.log('client connected to socket');
  socket.on('identification', async (data) => {
    var sessionJwt = await jwt.verify(data.sessionJwt, jwtSessionToken.jwtSessionTokenElipticKey, { algorithms: ['ES512'] });
    sessionJwt = await Cryptography.parseJwtSessionToken(sessionJwt.sessionJwt, jwtSessionToken, jwt);
    socket.identity = sessionJwt.identity._id;
    sockets.push(socket);
  });

  socket.on('verify', async (data) => {
    var reqData = await UserController.default.getRequestData(data);
    var regMessageIndex = registeredMessages.findIndex((msg) => {
      return socket.identity == msg.socket.identity;
    });
    var regMessage = registeredMessages.splice(regMessageIndex, 1)[0];
    var encryptedResponse: any = await UserController.default.encryptResponseData(reqData, {
      mailBox: regMessage.mailBox,
    });
    encryptedResponse.clientMsgId = reqData.decryptedData.data.clientMsgId;
    socket.emit('updateMailBox', encryptedResponse);
  });

  socket.on('disconnect', (data) => {
    console.log('disconnected', data);
    sockets.splice(
      sockets.reduce((total, currentSocket, index) => {
        if (currentSocket.identity == socket.identity) {
          total = index;
        }
        return total;
      }, 0),
      1
    );
  });
});

export default {
  registerMessage: (identity, mailBox) => {
    var socket = sockets.filter((currentSocket) => {
      return currentSocket.identity == identity._id;
    })[0];
    if (!socket){
      return;
    }
    registeredMessages.push({ socket: socket, mailBox: mailBox });
    socket.emit('verification', {});
  },
};
