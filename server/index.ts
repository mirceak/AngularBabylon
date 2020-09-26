import 'module-alias/register';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import setMongo from './mongo';
import Controllers from '@kernel/backend/controllers/base.controller.index';
import BaseController from '@kernel/backend/controllers/base/base.controller';

const app = express();
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
