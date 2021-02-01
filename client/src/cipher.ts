class cipher {
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
  private originalMap: string[] = [
    ...this.letters,
    ...this.numbers,
    ...this.characters,
  ];
  private td = new TextDecoder();
  private te = new TextEncoder();

  private randomThreshold = 250;

  private shaHash: string;
  private shaBytes: Array<any>;
  private scrambledMap(
    tmp = this.originalMap.slice(0),
    res = [],
    current = null
  ): string[] {
    while (res.length != this.originalMap.length) {
      current = tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0];
      res.push(current);
    }
    return res;
  }
  private generateLock(size, lock = [], i = 0): string[][] {
    for (i = 0; i < size; i++) {
      lock.push(this.scrambledMap());
    }
    return lock;
  }
  private engraveData(
    lock,
    key,
    message,
    i = 0,
    row = null,
    input = null,
    originalInputIdex = 0,
    output = null,
    messageChar = null
  ) {
    for (i = 0; i < message.length; i++) {
      row = lock[i];
      input = key[i % key.length];
      originalInputIdex = this.originalMap.indexOf(input);
      output = row[originalInputIdex];
      messageChar = message[i % message.length];
      if (output != messageChar) {
        row[row.indexOf(messageChar)] = output;
        row[originalInputIdex] = messageChar;
      }
    }
  }
  public unlock = (
    cipher: any,
    passwords,
    unlocked = '',
    password = passwords[0],
    i = 0,
    originalInputIndex = 0
  ): string => {
    cipher.lock = this.unShiftElements(cipher.lock, cipher.dataLock, passwords);
    for (i = 0; i < cipher.lock.length; i++) {
      originalInputIndex = this.originalMap.indexOf(
        password[i % password.length]
      );
      unlocked += cipher.lock[i][originalInputIndex];
    }
    return this.unlockMessage(unlocked, cipher.dataLock);
  };
  private makeCipherPieces(
    messageLen,
    dataLockLength = 0,
    dataLock = null,
    lock = null
  ): any {
    dataLockLength = Math.random() * this.randomThreshold;
    dataLock = this.generateLock(dataLockLength);
    lock = this.generateLock(messageLen);
    return {
      lock,
      dataLock,
    };
  }
  public shiftElements(
    lock,
    dataLock,
    passwords,
    columnPassword = null,
    lockLen = lock.length,
    i = 0,
    j = 0
  ) {
    passwords.forEach((password, index) => {
      columnPassword = passwords[passwords.length - (index + 1)];
      for (i = 0; i < columnPassword.length; i++) {
        lock = this.shift(
          lock,
          0,
          columnPassword.charCodeAt(i % columnPassword.length)
        );
        for (j = 0; j < lockLen; j++) {
          lock[j] = this.shift(
            lock[j],
            0,
            password.charCodeAt(j % password.length)
          );
        }
        lock = this.lockMap(lock, dataLock);
      }
    });
    return lock;
  }
  public unShiftElements(
    lock,
    dataLock,
    passwords,
    columnPassword = null,
    lockLen = lock.length,
    i = 0,
    j = 0
  ) {
    passwords.reverse();
    passwords.forEach((password, index) => {
      columnPassword = passwords[passwords.length - 1 - index];
      for (i = columnPassword.length - 1; i >= 0; i--) {
        lock = this.unlockMap(lock, dataLock);
        for (j = lockLen - 1; j >= 0; j--) {
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
  public shift(arr, direction, n, times = 0) {
    times = n > arr.length ? n % arr.length : n;
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
  public makeCipher = async (
    passwords,
    data,
    cipher = this.makeCipherPieces(data.length)
  ): Promise<any> => {
    data = this.lockMessage(data, cipher.dataLock);
    this.engraveData(cipher.lock, passwords[0], data);
    cipher.lock = this.shiftElements(cipher.lock, cipher.dataLock, passwords);
    return {
      lock: this.toString(cipher.lock),
      dataLock: this.toString(cipher.dataLock),
    };
  };
  private lockMessage(
    message: string,
    lock: string[][],
    locked = '',
    i = 0
  ): string {
    for (i = 0; i < message.length; i++) {
      locked += lock[i % lock.length][this.originalMap.indexOf(message[i])];
    }
    return locked;
  }
  public unlockMessage = (
    message: string,
    lock: string[][],
    unlocked = '',
    i = 0
  ): string => {
    for (i = 0; i < message.length; i++) {
      unlocked += this.originalMap[lock[i % lock.length].indexOf(message[i])];
    }
    return unlocked;
  };
  public lockMap(map: string[][], lock: string[][], i = 0, j = 0): string[][] {
    for (i = 0; i < map.length; i++) {
      for (j = 0; j < map[i].length; j++) {
        map[i][j] =
          lock[(i * j + j) % lock.length][this.originalMap.indexOf(map[i][j])];
      }
    }
    return map;
  }
  public unlockMap = (
    map: string[][],
    lock: string[][],
    i = 0,
    j = 0
  ): string[][] => {
    for (i = 0; i < map.length; i++) {
      for (j = 0; j < map[i].length; j++) {
        map[i][j] = this.originalMap[
          lock[(i * j + j) % lock.length].indexOf(map[i][j])
        ];
      }
    }
    return map;
  };
  public async getShaHash(subtle, msg) {
    this.shaBytes = Array.from(
      new Uint32Array(await subtle.digest('SHA-512', this.te.encode(msg)))
    );
    this.shaBytes = this.shaBytes.map((byte) => {
      return ('00' + byte.toString(32)).slice(-2);
    });
    this.shaHash = this.shaBytes.join('');
    return this.shaHash;
  }
  public toString = (lock: string[][], result = null): string => {
    result = lock.reduce((total, current) => {
      total += current.join('');
      return total;
    }, '');
    return result;
  };
  public fromString = (string: string, result = [], i = 0): string[][] => {
    for (i = 0; i < string.length / this.originalMap.length; i++) {
      result.push([
        ...string.substring(
          i * this.originalMap.length,
          this.originalMap.length * (i + 1)
        ),
      ]);
    }
    return result;
  };
  public async rsaEncrypt(subtle, plaintext, key, encrypted = null) {
    encrypted = await subtle.encrypt(
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
    iv = 'someRandomIvThatNeedsChaning',
    ciphertext = null
  ) {
    ciphertext = await subtle.encrypt(
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
  public async rsaDecrypt(subtle, ciphertext, key, plaintext = null) {
    plaintext = await subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async aesDecrypt(subtle, ciphertext, key, iv, plaintext = null) {
    plaintext = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: this.te.encode(iv),
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async generateRsaKeys(subtle, format, keys = null) {
    keys = await subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {
          name: 'SHA-512',
        },
      },
      true,
      ['encrypt', 'decrypt']
    );
    return {
      publicKey: keys.publicKey,
      privateKey: keys.privateKey,
      pubkData: JSON.stringify(await subtle.exportKey(format, keys.publicKey)),
      privkData: JSON.stringify(
        await subtle.exportKey(format, keys.privateKey)
      ),
    };
  }
  public async generateElipticKey(subtle, privateKey = null) {
    privateKey = await subtle.generateKey(
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
  public async importElipticKey(subtle, data, pub = false, key = null) {
    key = await subtle.importKey(
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
  public async generateAesKey(subtle, key = null) {
    key = await subtle.generateKey(
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
  public async importRsaKey(subtle, keyData, pub = false, key = null) {
    key = await subtle.importKey(
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
  public async importAesKey(subtle, keyData, format = 'jwk', key = null) {
    key = await subtle.importKey(
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
  public async getRsaEncryptedAesKey(
    subtle,
    rsaPubkData,
    rsaPublicKey = null,
    aesKey = null,
    rsaEncryptedAes = null
  ) {
    rsaPublicKey = await this.importRsaKey(subtle, rsaPubkData, true);
    aesKey = await this.generateAesKey(subtle);
    rsaEncryptedAes = await this.rsaEncrypt(
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

let instance = new cipher();

export default instance;
