class tunnel {
  private letters: Array<string> = [
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
  private numbers: Array<string> = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  private characters: Array<string> = [
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
    ' ',
  ];
  public randomThreshold = 250;
  public offsetThreshold = 1000;
  hashLen = 88;
  public originalMap: string[] = [
    ...this.letters,
    ...this.numbers,
    ...this.characters,
  ];
  private scrambledMap = (): string[] => {
    var tmp: string[] = this.originalMap.slice(0);
    var res: string[] = [];
    var current: string = null;
    while (res.length != this.originalMap.length) {
      current = tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0];
      res.push(current);
    }
    return res;
  };
  public generateLock = (size): string[][] => {
    var lock: string[][] = [];
    for (var i = 0; i < size; i++) {
      lock.push(this.scrambledMap());
    }
    return lock;
  };
  public engraveKey = (lock, key, message, _offset = false) => {
    if (message.length > lock.length) {
      console.log(lock.length, message.length);
      throw new Error('Lock must be bigger than message');
    }
    var offset =
      _offset == false ? 0 : Math.floor(Math.random() * this.offsetThreshold);
    for (var i = 0; i < message.length; i++) {
      var row: string[] = lock[i + offset];
      var input: string = key[(i + offset) % key.length];
      var originalInputIdex: number = this.originalMap.indexOf(input);
      var output: string = row[originalInputIdex];
      var messageChar: string = message[i];
      if (output != messageChar) {
        row[row.indexOf(messageChar)] = output;
        row[originalInputIdex] = messageChar;
      }
    }
  };
  public unlock = (lock: string[][], password: string): string => {
    var unlocked = '';
    for (var i = 0; i < lock.length; i++) {
      var originalInputIdex = this.originalMap.indexOf(
        password[i % password.length]
      );
      unlocked += lock[i][originalInputIdex];
    }

    return unlocked;
  };
  extractClientInnerLock = (
    p2Hash,
    p3Hash,
    clientLock,
    serverInnerLock
  ): string[][] => {
    var p2hashLocked = this.lockMessage(p2Hash, clientLock.dataLock);
    var p3hashLocked = this.lockMessage(p3Hash, clientLock.dataLock);

    var lockedClientLockMessage = this.unlock(
      clientLock.lock,
      this.toString(serverInnerLock)
    );

    var p2hashLockedTwice = this.lockMessage(p2hashLocked, serverInnerLock);
    var p2hashIndex = lockedClientLockMessage.indexOf(p2hashLockedTwice);

    var partUnlockedClientLockMessage = this.unlockMessage(
      lockedClientLockMessage.substring(p2hashIndex),
      serverInnerLock
    ).substring(p2hashLockedTwice.length);

    var p3hashIndex = partUnlockedClientLockMessage.indexOf(p3hashLocked);
    var finalLockString = partUnlockedClientLockMessage.substring(
      0,
      p3hashIndex
    );

    var finalClientLock = this.fromString(finalLockString);
    return finalClientLock;
  };
  extractServerInnerLock = (p1Hash, p2Hash, p3Hash, serverLock): string[][] => {
    var p1hashLocked = this.lockMessage(p1Hash, serverLock.dataLock);
    var p2hashLocked = this.lockMessage(p2Hash, serverLock.dataLock);
    var p3hashLocked = this.lockMessage(p3Hash, serverLock.dataLock);

    var lockedServerLockMessage = this.unlock(serverLock.lock, p1hashLocked);

    var p2hashLockedTwice = this.lockMessage(p2hashLocked, serverLock.dataLock);
    var p2hashIndex = lockedServerLockMessage.indexOf(p2hashLockedTwice);

    var unlockedServerLockMessage = this.unlockMessage(
      lockedServerLockMessage.substring(p2hashIndex),
      serverLock.dataLock
    ).substring(p2hashLockedTwice.length);

    var p3hashIndex = unlockedServerLockMessage.indexOf(p3hashLocked);
    var serverLockString = unlockedServerLockMessage.substring(0, p3hashIndex);

    var unlockedServerLock = this.fromString(serverLockString);
    return unlockedServerLock;
  };
  public makeClientLock = (p1Hash, p2Hash, p3Hash, serverLock): any => {
    var serverInnerLock = this.extractServerInnerLock(
      p1Hash,
      p2Hash,
      p3Hash,
      serverLock
    );

    var lockPieces = this.makeLockPieces(p1Hash, p2Hash, p3Hash);
    var lockedFinalLock = this.lockMessage(
      lockPieces.p2hashLocked +
        this.toString(lockPieces.innerLock) +
        lockPieces.p3hashLocked,
      serverInnerLock
    );
    this.engraveKey(
      lockPieces.lock,
      this.toString(serverInnerLock),
      lockedFinalLock,
      true
    );

    return {
      lock: lockPieces.lock,
      dataLock: lockPieces.dataLock,
      innerLock: lockPieces.innerLock,
      serverInnerLock: serverInnerLock,
    };
  };
  makeLockPieces = (p1Hash, p2Hash, p3Hash): any => {
    var innerLockLength =
      Math.random() * this.randomThreshold + this.originalMap.length;
    var dataLockLength = this.hashLen + Math.random() * this.randomThreshold;
    var lockLength =
      this.hashLen * 2 +
      innerLockLength * innerLockLength +
      Math.random() * this.randomThreshold +
      this.offsetThreshold;

    var innerLock = this.generateLock(innerLockLength);
    var dataLock = this.generateLock(dataLockLength);
    var lock = this.generateLock(lockLength);

    var p1hashLocked = this.lockMessage(p1Hash, dataLock);
    var p2hashLocked = this.lockMessage(p2Hash, dataLock);
    var p3hashLocked = this.lockMessage(p3Hash, dataLock);

    return {
      lock,
      dataLock,
      innerLock,
      p1hashLocked,
      p2hashLocked,
      p3hashLocked,
    };
  };
  public makeServerLock = (p1Hash, p2Hash, p3Hash): any => {
    var lockPieces = this.makeLockPieces(p1Hash, p2Hash, p3Hash);

    var message = this.lockMessage(
      lockPieces.p2hashLocked +
        this.toString(lockPieces.innerLock) +
        lockPieces.p3hashLocked,
      lockPieces.dataLock
    );
    this.engraveKey(lockPieces.lock, lockPieces.p1hashLocked, message, true);

    return {
      lock: lockPieces.lock,
      dataLock: lockPieces.dataLock,
      innerLock: lockPieces.innerLock,
    };
  };
  public lockMessage = (message: string, lock: string[][]): string => {
    var locked = '';
    for (var i = 0; i < message.length; i++) {
      locked += lock[i % lock.length][this.originalMap.indexOf(message[i])];
    }
    return locked;
  };
  public unlockMessage = (message: string, lock: string[][]): string => {
    var unlocked = '';
    for (var i = 0; i < message.length; i++) {
      unlocked += this.originalMap[lock[i % lock.length].indexOf(message[i])];
    }
    return unlocked;
  };
  public toString = (lock: string[][]): string => {
    var result = lock.reduce((total, current) => {
      total += current.join('');
      return total;
    }, '');

    return result;
  };
  public fromString = (string: string): string[][] => {
    var result = [];
    for (var i = 0; i < string.length / this.originalMap.length; i++) {
      result.push([
        ...string.substring(
          i * this.originalMap.length,
          this.originalMap.length * (i + 1)
        ),
      ]);
    }
    return result;
  };
}

let instance = new tunnel();

export default instance;
