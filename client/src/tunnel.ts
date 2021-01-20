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

  private randomThreshold = 250;
  private publicExponent = new Uint8Array([1, 0, 1]);
  private originalMap: string[] = [
    ...this.letters,
    ...this.numbers,
    ...this.characters,
  ];
  private td = new TextDecoder();
  private te = new TextEncoder();
  private scrambledMap(): string[] {
    var tmp: string[] = this.originalMap.slice(0);
    var res: string[] = [];
    var current: string = null;
    while (res.length != this.originalMap.length) {
      current = tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0];
      res.push(current);
    }
    return res;
  }
  private generateLock(size): string[][] {
    var lock: string[][] = [];
    for (var i = 0; i < size; i++) {
      lock.push(this.scrambledMap());
    }
    return lock;
  }
  private engraveData(lock, key, message) {
    // console.log(message, message.length, lock.length)
    if (message.length > lock.length) {
      console.log(lock.length, message.length, message);
      throw new Error('Lock must be bigger than message');
    }
    for (var i = 0; i < message.length; i++) {
      var row: string[] = lock[i];
      var input: string = key[i % key.length];
      var originalInputIdex: number = this.originalMap.indexOf(input);
      var output: string = row[originalInputIdex];
      var messageChar: string = message[i % message.length];
      if (output != messageChar) {
        row[row.indexOf(messageChar)] = output;
        row[originalInputIdex] = messageChar;
      }
    }
  }
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
  private makeLockPieces(messageLen): any {
    var dataLockLength = Math.random() * this.randomThreshold;
    var dataLock = this.generateLock(dataLockLength);
    var lock = this.generateLock(messageLen);
    return {
      lock,
      dataLock,
    };
  }
  private makeLock(password, message): any {
    var lockPieces = this.makeLockPieces(message.length);
    message = this.lockMessage(message, lockPieces.dataLock);
    this.engraveData(lockPieces.lock, password, message);

    return lockPieces;
  }
  public makePubkLock = async (password, pubkData, subtle): Promise<any> => {
    var responsePubk = await this.importRsaKey(subtle, pubkData);
    var rsaKey = await this.generateRsaKeys(subtle);
    var jsonKey = JSON.stringify(
      await subtle.exportKey('jwk', rsaKey.publicKey)
    );
    var encrypted = await this.rsaEncrypt(subtle, jsonKey, responsePubk);
    var lock = this.makeLock(password, encrypted);
    return {
      rsaKey,
      lock,
    };
  };
  private lockMessage(message: string, lock: string[][]): string {
    var locked = '';
    for (var i = 0; i < message.length; i++) {
      locked += lock[i % lock.length][this.originalMap.indexOf(message[i])];
    }
    return locked;
  }
  public unlockMessage = (message: string, lock: string[][]): string => {
    var unlocked = '';
    for (var i = 0; i < message.length; i++) {
      unlocked += this.originalMap[lock[i % lock.length].indexOf(message[i])];
    }
    return unlocked;
  };
  private toString = (lock: string[][]): string => {
    var result = lock.reduce((total, current) => {
      total += current.join('');
      return total;
    }, '');

    return result;
  };
  private fromString = (string: string): string[][] => {
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
  private async getShaHash(subtle, msg) {
    let digest: any = await subtle.digest('SHA-512', this.te.encode(msg));
    return digest;
  }
  private async rsaEncrypt(subtle, plaintext, key) {
    const encrypted = await subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      this.te.encode(plaintext)
    );

    return new Uint16Array(encrypted.ciphertext).join(',');
  }
  private async aesEncrypt(subtle, plaintext, key, iv = 'testing testing testing testing testing testing testing ') {
    const ciphertext = await subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      this.te.encode(plaintext)
    );
    return {
      iv,
      ciphertext,
    };
  }
  private async rsaDecrypt(subtle, ciphertext, key) {
    const plaintext = await subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  private async aesDecrypt(subtle, ciphertext, key, iv) {
    const plaintext = await subtle.decrypt(
      {
        name: 'RSA-OAEP',
        iv,
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  private async generateRsaKeys(subtle) {
    const { publicKey, privateKey } = await subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: this.publicExponent,
        hash: {
          name: 'SHA-512',
        },
      },
      true,
      ['encrypt', 'decrypt']
    );
    return { publicKey, privateKey };
  }
  private async generateAesKeys(subtle) {
    const key = await subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }
  private async importRsaKey(subtle, keyData, format = 'jwk', hash = 'SHA-512') {
    const key = await subtle.importKey(
      format,
      keyData,
      {
        name: 'RSA-OAEP',
        hash,
      },
      true,
      ['encrypt']
    );
    return key;
  }
  private async importAesKey(subtle, keyData, length, format = 'jwk') {
    const key = await subtle.importKey(
      format,
      keyData,
      {
        name: 'AES-GCM',
        length,
      },
      true,
      ['encrypt']
    );
    return key;
  }
}

let instance = new tunnel();

export default instance;
