import * as SEAL from 'node-seal';
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
  private hCrypt = null;
  private _hCrypt = (async () => {
    if (!this.hCrypt){
      /* @ts-ignore fuyck yaaya fuyck you seal sheit call*/
      const seal = await SEAL();
      const schemeType = seal.SchemeType.bfv;
      const securityLevel = seal.SecurityLevel.tc128;
      const polyModulusDegree = 1024;
      const bitSizes = [24];
      const bitSize = 14;
      const parms = seal.EncryptionParameters(schemeType);
      parms.setPolyModulusDegree(polyModulusDegree);
      parms.setCoeffModulus(
        seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
      );
      parms.setPlainModulus(
        seal.PlainModulus.Batching(polyModulusDegree, bitSize)
      );
      this.hCrypt = {
        securityLevel: securityLevel,
        parms: parms,
        seal: seal
      };
    }
  })();
  public async generateCipher(pubkData, data) {
    var hCrypt = await this.hCrypt;
    const context = hCrypt.seal.Context(hCrypt.parms, true, hCrypt.securityLevel);
    const encoder: any = hCrypt.seal.BatchEncoder(context);
    const keyGenerator = hCrypt.seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    publicKey.load(context, this.te.encode(pubkData));
    const encryptor = hCrypt.seal.Encryptor(context, publicKey);
    const cipher = encryptor.encrypt(
      encoder.encode(Int32Array.from(data))
    );
    var result = cipher.save();
    context.delete();
    encoder.delete();
    keyGenerator.delete();
    publicKey.delete();
    encryptor.delete();
    cipher.delete();
    return result;
  }
  public async hCryptAdd(pubkData, cipherData, data) {
    var hCrypt = await this.hCrypt;
    const context = hCrypt.seal.Context(hCrypt.parms, true, hCrypt.securityLevel);
    const encoder: any = hCrypt.seal.BatchEncoder(context);
    const evaluator = hCrypt.seal.Evaluator(context);
    const keyGenerator = hCrypt.seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    publicKey.load(context, this.te.encode(pubkData));
    const encryptor = hCrypt.seal.Encryptor(context, publicKey);
    const cipherAdd = encryptor.encrypt(
      encoder.encode(Int32Array.from(this.te.encode(data)))
    );
    const cipher = encryptor.encrypt(
      encoder.encode(Int32Array.from([]))
    );
    cipher.load(context, this.te.encode(cipherData));
    evaluator.add(cipher, cipherAdd, cipherAdd);
    var result = cipherAdd.save();
    context.delete();
    encoder.delete();
    evaluator.delete();
    keyGenerator.delete();
    publicKey.delete();
    encryptor.delete();
    cipherAdd.delete();
    cipher.delete();
    return result;
  }
  public async hCryptDecrypt(keys, cipherText) {
    var hCrypt = await this.hCrypt;
    const context = hCrypt.seal.Context(hCrypt.parms, true, hCrypt.securityLevel);
    const encoder: any = hCrypt.seal.BatchEncoder(context);
    keys = await this.hCryptLoadKeys(keys);
    const decryptor = hCrypt.seal.Decryptor(context, keys.privateKey);
    const encryptor = hCrypt.seal.Encryptor(context, keys.publicKey);
    const cipher = encryptor.encrypt(
      encoder.encode(Int32Array.from([]))
    );
    cipher.load(context, this.te.encode(cipherText));
    const decryptedPlainText: any = decryptor.decrypt(cipher);
    const decryptedText = encoder.decode(decryptedPlainText);
    var result = this.td
      .decode(decryptedText)
      .replace(new RegExp(String.fromCharCode(0), 'g'), '');
    context.delete();
    encoder.delete();
    decryptor.delete();
    encryptor.delete();
    cipher.delete();
    decryptedPlainText.delete();
    keys.publicKey.delete();
    keys.privateKey.delete();
    return JSON.parse(result);
  }
  public async hCryptLoadKeys(keys) {
    var hCrypt = await this.hCrypt;
    const context = hCrypt.seal.Context(hCrypt.parms, true, hCrypt.securityLevel);
    const keyGenerator = hCrypt.seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const privateKey = keyGenerator.secretKey();
    privateKey.load(context, keys.privkData);
    publicKey.load(context, keys.pubkData);
    keys.privateKey = privateKey;
    keys.publicKey = publicKey;
    context.delete();
    keyGenerator.delete();
    return keys;
  }
  public async generateHCryptKeys() {
    var hCrypt = await this.hCrypt;
    const context = hCrypt.seal.Context(hCrypt.parms, true, hCrypt.securityLevel);
    const keyGenerator = hCrypt.seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const privateKey = keyGenerator.secretKey();
    context.delete();
    var result = {
      pubkData: publicKey.save(),
      privkData: privateKey.save(),
    };
    keyGenerator.delete();
    publicKey.delete();
    privateKey.delete();
    return result;
  }
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
    this.unShiftElements(tunnel.lock, passwords);
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
  public shiftElements(lock, passwords) {
    var password;
    while (passwords.length) {
      password = passwords.shift();

      for (var i = 0; i < lock.length; i++) {
        lock[i] = this.shift(
          lock[i],
          0,
          Math.floor(password.charCodeAt(i % password.length) / 3)
        );
      }
    }
  }
  public unShiftElements(lock, passwords) {
    var password;
    while (passwords.length) {
      password = passwords.pop();

      for (var i = lock.length - 1; i >= 0; i--) {
        lock[i] = this.shift(
          lock[i],
          1,
          Math.floor(password.charCodeAt(i % password.length) / 3)
        );
      }
    }
  }
  public shift(arr, direction, n) {
    var times = n > arr.length ? n % arr.length : n;
    return arr.concat(
      arr.splice(0, direction > 0 ? arr.length - times : times)
    );
  }
  public makeTunnel = async (passwords, data): Promise<any> => {
    var tunnel = this.makeTunnelPieces(data.length);
    data = this.lockMessage(data, tunnel.dataLock);
    this.engraveData(tunnel.lock, passwords[0], data);
    this.shiftElements(tunnel.lock, passwords);
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
        ...string.substring(
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
