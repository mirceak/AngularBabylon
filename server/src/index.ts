import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import setMongo from './mongo';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base/base.controller.index';

import { readFileSync } from 'fs';
import * as https from 'https';

var socketApp = require('./socketio');
const httpApp = express();
httpApp.set('port', 8000);
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
      key: readFileSync(path.join(__dirname, "../../src/certs/https.key"), 'utf-8'),
      cert: readFileSync(path.join(__dirname, "../../src/certs/https.cert"), 'utf-8'),
    },
    app
  )
  .listen(8001, () => {
    console.log('Listening for http requests...');
  });
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));
async function main(): Promise<any> {
  try {
    await setMongo();

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    Object.keys(Controllers).map(async (key) => {
      let ctrl: BaseController = Controllers[key];
      app.use('/api', await ctrl.getRouter());
    });
    app.use('', express.static(path.join(__dirname, '../../../dist/public/')));
    app.get('*', (req, res) => {
      if (req.headers.host.includes('www.')) {
        return res.redirect('https://' + req.headers.host.replaceAll(/www./g, '') + req.url);
      }
      res.sendFile(path.join(__dirname, '../../../dist/public/spa/index.html'));
    });
  } catch (err) {
    console.error(err);
  }
}

main();
