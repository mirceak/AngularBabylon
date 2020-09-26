import 'module-alias/register';
import * as express from 'express';
import * as path from 'path';

import setMongo from './mongo';
import Controllers from '@kernel/backend/controllers/base.controller.index';

const app = express();
async function main(): Promise<any> {
  try {
    await setMongo();

    app.set('port', 3000);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', express.static(path.join(__dirname, '../../client')));

    const controllerParser = (controllers) => {
      Object.keys(controllers).map((key) => {
        let ctrl = new controllers[key]();
        app.use('/api', ctrl.getRouter());
      });
    };
    controllerParser(Controllers);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`An2gular F1ull Ssstack listening ons port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}

main();
