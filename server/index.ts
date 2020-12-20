import 'module-alias/register';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import setMongo from './mongo';
import BaseController from './controllers/base/base.controller';
import Controllers from './controllers/base.controller.index';

const app = express();
async function main(): Promise<any> {
  try {
    await setMongo();

    app.set('port', 3000);
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', express.static(path.join(__dirname, '../../dist/client')));
    const controllerParser = (controllers: any[]) => {
      Object.keys(controllers).map((key) => {
        let ctrl: BaseController = new controllers[key]();
        app.use('/api', ctrl.getRouter());
      });
    };
    controllerParser(Controllers);

    app.get('/utils/tunnel', (req, res) => {
      res.send({
        original: originalMap,
        steps: o});
    });

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
}
main();

var resp = {};
var letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var characters = [
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+',
  '-',
  '=',
  ',',
  '<',
  '>',
  '.',
  '/',
  '?',
  '[',
  ']',
  '{',
  '}',
  ';',
  ':',
  '\\',
  '|',
  '"',
  "'",
];
var originalMap = [...letters, ...numbers, ...characters];
var scrambledMap = () => {
  var tmp = originalMap.slice(0);
  var res = [];
  var current = null;
  while (res.length != originalMap.length) {
    current = tmp.splice(Math.floor(Math.random() * (tmp.length - 1)), 1)[0];
    res.push(current);
  }
  return res;
};

var key = 'someUserpAssword';
var message = '34sd%jkfds)9#Nn378u(';

var algo = (): any => {
  var input: string = '';

  var clearInput = (start: number): void => {};
  var clearOutput = (start: number, end: number): void => {};
  var replaceOutput = (regex, string: string): void => {};
  var addOutput = (start: number, string: string): void => {};
  var addInput = (char: string): string => {
    input += char;
    runAlgo();
    return input;
  };
  var t = 3;
  var runAlgo = (): void => {
    if (t > 0 && (input[input.length-1] == 'A')) {
      input = input.substring(0, input.length-4);
      t -= 1;
    }
  };

  return {
    addInput,
  };
};

var algoInst = algo();

var enterPass = (pass: string): void => {
  var tempI = 0;
  var tempP = key[tempI];
  var algoI = ''
  while (tempP != pass && algoI.length < pass.length) {
    algoI = algoInst.addInput(tempP);
    if (algoI.length < tempI){
      tempI = algoI.length
      tempP = key[tempI];
    }
    console.log(algoI, tempP);
    if (algoI[algoI.length-1] == tempP){
      tempI += 1;
      tempP = key[tempI];
    }
  }
};

enterPass (key);

var o = []

var scrambled = scrambledMap();
for (var i=0; i<100; i++){
  o.push(scrambledMap())
}