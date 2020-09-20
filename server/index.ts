import * as express from 'express';
import * as path from 'path';

const app = express();
app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, '../client')));
app.listen(app.get('port'), () =>
  console.log(`Angular Full Stack listening on port ${app.get('port')}`)
);