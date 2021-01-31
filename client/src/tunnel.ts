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

  private shaHash: string;
  private shaBytes: Array<any>;
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
  public unlock = (tunnel: any, passwords): string => {
    var unlocked = '';
    var password = passwords[0];
    tunnel.lock = this.unShiftElements(tunnel.lock, tunnel.dataLock, passwords);
    for (var i = 0; i < tunnel.lock.length; i++) {
      var originalInputIdex = this.originalMap.indexOf(
        password[i % password.length]
      );
      unlocked += tunnel.lock[i][originalInputIdex];
    }
    return this.unlockMessage(unlocked, tunnel.dataLock);
  };
  private makeTunnelPieces(messageLen): any {
    var dataLockLength = Math.random() * this.randomThreshold;
    var dataLock = this.generateLock(dataLockLength);
    var lock = this.generateLock(messageLen);
    return {
      lock,
      dataLock,
    };
  }
  public shiftElements(lock, dataLock, passwords) {
    var columnPassword;
    var lockLen = lock.length;
    passwords.forEach((password, index) => {
      columnPassword = passwords[passwords.length - (index + 1)];
      for (var i = 0; i < columnPassword.length; i++) {
        lock = this.shift(
          lock,
          0,
          columnPassword.charCodeAt(i % columnPassword.length)
        );
        for (var j = 0; j < lockLen; j++) {
          lock[j] = this.shift(
            lock[j],
            0,
            password.charCodeAt(j % password.length)
          );
        }
        lock = this.toString(lock);
        lock = this.lockMessage(lock, dataLock);
        lock = this.fromString(lock);
      }
    });
    return lock;
  }
  public unShiftElements(lock, dataLock, passwords) {
    var columnPassword;
    var lockLen = lock.length;
    passwords.reverse();
    passwords.forEach((password, index) => {
      columnPassword = passwords[passwords.length - 1 - index];
      for (var i = columnPassword.length - 1; i >= 0; i--) {
        lock = this.toString(lock);
        lock = this.unlockMessage(lock, dataLock);
        lock = this.fromString(lock);
        for (var j = lockLen - 1; j >= 0; j--) {
          lock[j] = this.shift(
            lock[j],
            1,
            password.charCodeAt(j % password.length)
          );
        }
        lock = this.shift(
          lock,
          1,
          columnPassword.charCodeAt(i % columnPassword.length)
        );
      }
    });
    passwords.reverse();
    return lock;
  }
  public shift(arr, direction, n) {
    var times = n > arr.length ? n % arr.length : n;
    while (times != 0) {
      if (direction) {
        arr.push(arr.shift());
      } else {
        arr.unshift(arr.pop());
      }
      times--;
    }
    return arr;
  }
  public makeTunnel = async (passwords, data): Promise<any> => {
    var tunnel = this.makeTunnelPieces(data.length);
    data = this.lockMessage(data, tunnel.dataLock);
    this.engraveData(tunnel.lock, passwords[0], data);
    tunnel.lock = this.shiftElements(tunnel.lock, tunnel.dataLock, passwords);
    return {
      lock: this.toString(tunnel.lock),
      dataLock: this.toString(tunnel.dataLock),
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
  public async getShaHash(subtle, msg) {
    this.shaBytes = Array.from(
      new Uint32Array(await subtle.digest('SHA-512', this.te.encode(msg)))
    );
    this.shaBytes = this.shaBytes.map((byte) => {
      return ('00' + byte.toString(32)).slice(-2);
    });
    this.shaHash = this.shaBytes.join('');
    // this.shaHash = this.shaHash.substr(0, 5);
    return this.shaHash;
  }
  private toString = (lock: string[][]): string => {
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
        ...string
          .substring(
            i * this.originalMap.length,
            this.originalMap.length * (i + 1)
          ),
      ]);
    }
    return result;
  };
  public async rsaEncrypt(subtle, plaintext, key) {
    const encrypted = await subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      this.te.encode(plaintext)
    );
    return encrypted;
  }
  public async aesEncrypt(
    subtle,
    plaintext,
    key,
    iv = 'someRandomIvThatNeedsChaning'
  ) {
    const ciphertext = await subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: this.te.encode(iv),
      },
      key,
      this.te.encode(plaintext)
    );
    return {
      iv,
      ciphertext,
    };
  }
  public async rsaDecrypt(subtle, ciphertext, key) {
    const plaintext = await subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async aesDecrypt(subtle, ciphertext, key, iv) {
    const plaintext = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: this.te.encode(iv),
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async generateRsaKeys(subtle, format) {
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
    return {
      publicKey: publicKey,
      privateKey: privateKey,
      pubkData: JSON.stringify(await subtle.exportKey(format, publicKey)),
      privkData: JSON.stringify(await subtle.exportKey(format, privateKey)),
    };
  }
  public async generateElipticKey(subtle) {
    const { privateKey } = await subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-521',
      },
      true,
      ['sign', 'verify']
    );
    return {
      privkData: JSON.stringify(await subtle.exportKey('jwk', privateKey)),
    };
  }
  public async importElipticKey(subtle, data, pub = false) {
    var key = await subtle.importKey(
      'jwk',
      JSON.parse(data),
      {
        name: 'ECDSA',
        namedCurve: 'P-521',
      },
      true,
      [pub ? 'verify' : 'sign']
    );
    return await subtle.exportKey('node.keyObject', key);
  }
  public async generateAesKey(subtle) {
    const key = await subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    return {
      publicKey: key,
      privateKey: key,
      pubkData: (await subtle.exportKey('jwk', key)).k,
    };
  }
  public async importRsaKey(subtle, keyData, pub = false) {
    const key = await subtle.importKey(
      'jwk',
      JSON.parse(keyData),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-512',
      },
      true,
      [pub ? 'encrypt' : 'decrypt']
    );
    return key;
  }
  public async importAesKey(subtle, keyData, format = 'jwk') {
    const key = await subtle.importKey(
      format,
      {
        key_ops: ['encrypt', 'decrypt'],
        ext: true,
        kty: 'oct',
        k: keyData,
        alg: 'A256GCM',
      },
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }
  public async getRsaEncryptedAesKey(subtle, rsaPubkData) {
    var rsaPublicKey = await this.importRsaKey(subtle, rsaPubkData, true);
    var aesKey = await this.generateAesKey(subtle);
    var rsaEncryptedAes = await this.rsaEncrypt(
      subtle,
      aesKey.pubkData,
      rsaPublicKey
    );
    return {
      rsaEncryptedAes,
      rsaPublicKey: rsaPublicKey,
      aesKey: aesKey.privateKey,
      aesPubkData: aesKey.pubkData,
    };
  }
}

let instance = new tunnel();

export default instance;
