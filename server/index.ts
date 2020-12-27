import 'module-alias/register';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as crypto from 'crypto';

import setMongo from './mongo';
import tunnel from '../client/src/tunnel';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

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
    app.post('/utils/tunnel', onLockTunnel);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}

var getHash = (key, msg) => {
  var hash = crypto.createHmac('sha512', key);
  hash.update(msg);
  return hash.digest('base64');
};

const hashLen = 88;
const p1 = 'pass1';
const p2 = 'pass2';
const p3 = 'pass3';

var serverInnerLock: string[][];

var onTunnel = (req, res) => {
  var serverLock = tunnel.makeServerLock(getHash(p2, p1), getHash(p3, p2), getHash(p1, p3));

  serverInnerLock = serverLock.innerLock;
  res.send({
    lock: tunnel.toString(serverLock.lock),
    dataLock: tunnel.toString(serverLock.dataLock),
  });
};

var onLockTunnel = (req, res) => {
  var finalLock = {
    lock: tunnel.fromString(req.body.finalLock.lock),
    dataLock: tunnel.fromString(req.body.finalLock.dataLock),
  };
  var clientInnerLock = tunnel.extractClientInnerLock(getHash(p3, p2), getHash(p1, p3), finalLock, serverInnerLock);

  var encrypted = tunnel.lockMessage(
    `nada`,
    clientInnerLock
  );
  var decrypted = tunnel.unlockMessage(req.body.encrypted, serverInnerLock);
  res.send({
    decrypted,
    encrypted,
  });
};

main();
