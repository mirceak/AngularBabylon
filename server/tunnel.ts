class tunnel {
  private letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  private numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  private characters = [
    "~",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "-",
    "=",
    ",",
    "<",
    ">",
    ".",
    "/",
    "?",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "\\",
    "|",
    '"',
    "'",
    " ",
    "\ "
  ];
  public originalMap = [...this.letters, ...this.numbers, ...this.characters];
  public scrambledMapLength = (passes) => {
    var result = [];
    var scrMap;
    for (var i = 0; i < passes; i++) {
      scrMap = this.scrambledMap();
      result.push(...scrMap);
    }
    return result;
  };
  private scrambledMap = () => {
    var tmp = this.originalMap.slice(0);
    var res = [];
    var current = null;
    while (res.length != this.originalMap.length) {
      current = tmp.splice(Math.floor(Math.random() * (tmp.length)), 1)[0];
      res.push(current);
    }
    return res;
  };
  public generateLock = (size) => {
    var lock = [];
    for (var i = 0; i < size * 2; i++) {
      lock.push(this.scrambledMap());
    }
    return lock;
  };
  public engraveKey = (lock, key, message) => {
    // console.log(lock);
    var offset = key.length + Math.floor(Math.random() * (message.length / 4));
    for (var i = offset; i < message.length + offset; i++) {
      var row = lock[i];
      var input = key[i % key.length];
      var originalInputIdex = this.originalMap.indexOf(input);
      if (!row){
        console.log(i, lock.length);
      }
      var output = row[originalInputIdex];
      var messageChar = message[i - offset];
      if (output != messageChar) {
        row[row.indexOf(messageChar)] = output;
        row[originalInputIdex] = messageChar;
      }
    }
    return lock;
  };
  public lockMessage = (message, lock)=> {
    var locked = '';
    for (var i=0; i<message.length; i++){
      locked += lock[i % lock.length][this.originalMap.indexOf(message[i])]
    }
    return locked
  }
}

let instance = new tunnel();

export default instance;