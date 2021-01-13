import 'module-alias/register';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as crypto from 'crypto';

import setMongo from './mongo';
import tunnel from '../client/src/tunnel';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import SchemaUser from './entities/user/schema/schema.user';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const getHash = (key, msg) => {
  var hash = crypto.createHmac('sha512', key);
  hash.update(msg);
  return hash.digest('base64');
}; 
 
io.on('connection', (socket: Socket) => {
  console.log('client connected to socket');
  var p1;
  var p2;
  var p3;
  var ph1;
  var ph2;
  var ph3;

  socket.on('startSession', (data) => {
    p1 = data.email;
    SchemaUser.findOne({ email: p1 }, (err, user) => {
      if (!user) {
        socket.disconnect();
        return err;
      }
      p2 = user.username;
      p3 = user.password;
      ph1 = getHash(p2, p1);
      ph2 = getHash(p3, p2);
      ph3 = getHash(p1, p3);

      console.log(p1,p2,p3)
    });
  });

  socket.on('injectCodeInServer', (data) => {
    socket.emit('injectCodeInClient', { a: 'helow' });
  });

  socket.on('disconnect', (data) => {
    console.log('disconnected')
  });
});

var p1;
var p2;
var p3;
var ph1;
var ph2;
var ph3;
var onTunnel = (req, res) => {
  p1 = req.body.email;
  p2 = req.body.email;
  p3 = req.body.email;

  ph1 = getHash(p2, p1);
  ph2 = getHash(p3, p2);
  ph3 = getHash(p1, p3);
  var serverLock = tunnel.makeServerLock(ph1, ph2, ph3);

  res.send({
    lock: tunnel.toString(serverLock.lock),
    dataLock: tunnel.toString(serverLock.dataLock),
  });
};

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

    app.get('/utils/tunnel', onTunnel);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}

main();
