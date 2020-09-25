import * as express from 'express';
import * as path from 'path';

import Controllers from './client/src/kernel/backend/controllers/index.controller'

const controllerParser = (controllers) => {
  Object.keys(controllers).map((key)=>{
    let ctrl = new controllers[key]();
    console.log(ctrl);
  })
};
controllerParser(Controllers);
console.log(3);
const app = express();
app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(app.get('port'), () =>
  console.log(`An2gular F1ull Ssstack listening ons port ${app.get('port')}`)
);