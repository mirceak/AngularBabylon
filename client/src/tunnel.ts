import * as SEAL from 'node-seal';
import { encode } from 'punycode';
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
  private homoSeal = (async () => {
    /* @ts-ignore fuyck yaaya fuyck you seal sheit call*/
    const seal = await SEAL();
    const schemeType = seal.SchemeType.bfv;
    const securityLevel = seal.SecurityLevel.tc128;
    const polyModulusDegree = 4096;
    const bitSizes = [36, 36, 37];
    const bitSize = 20;
    const parms = seal.EncryptionParameters(schemeType);
    // Set the PolyModulusDegree
    parms.setPolyModulusDegree(polyModulusDegree);
    // Create a suitable set of CoeffModulus primes
    parms.setCoeffModulus(
      seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
    );
    // Set the PlainModulus to a prime of bitSize 20.
    parms.setPlainModulus(
      seal.PlainModulus.Batching(polyModulusDegree, bitSize)
    );
    const context = seal.Context(
      parms, // Encryption Parameters
      true, // ExpandModChain
      securityLevel // Enforce a security level
    );
    if (!context.parametersSet()) {
      throw new Error(
        'Could not set the parameters in the given context. Please try different encryption parameters.'
      );
    }
    const encoder: any = seal.BatchEncoder(context);
    const keyGenerator = seal.KeyGenerator(context);
    const evaluator = seal.Evaluator(context);

    // const publicKey = keyGenerator.createPublicKey();
    // const secretKey = keyGenerator.secretKey();
    // const encryptor = seal.Encryptor(context, publicKey);
    // const decryptor = seal.Decryptor(context, secretKey);
    // // Create data to be encrypted
    // const array = new Int32Array(4096).map((current) => {
    //   return Math.random() * 20000 - 10000;
    // });
    // const plainText: any = encoder.encode(array);
    // const array1 = new Int32Array(4096).map((current) => {
    //   return Math.random() * 20000 - 10000;
    // });
    // const plainText1: any = encoder.encode(array1);
    // const cipherText: any = encryptor.encrypt(plainText);

    // evaluator.addPlain(cipherText, plainText1, cipherText);
    // const decryptedPlainText = decryptor.decrypt(cipherText);
    // const decodedArray = encoder.decode(decryptedPlainText);
    // console.log('decodedArray', decodedArray);

    return {
      seal: seal,
      context: context,
      encoder: encoder,
      keyGenerator: keyGenerator,
      evaluator: evaluator,
    };
  })();

  public async homoDecrypt(keys, cipherText) {
    var homoSeal = await this.homoSeal;
    const decryptor = homoSeal.seal.Decryptor(homoSeal.context, keys.privateKey);
    const encryptor = homoSeal.seal.Encryptor(homoSeal.context, keys.publicKey);
    const cipher = encryptor.encrypt(homoSeal.encoder.encode(Int32Array.from([])))
    cipher.load(homoSeal.context, this.te.encode(cipherText));
    const decryptedPlainText: any = decryptor.decrypt(cipher);
    const decryptedText = homoSeal.encoder.decode(decryptedPlainText);
    return decryptedText;
  }

  public async homoEncrypt(pubkData, plainText) {
    var homoSeal = await this.homoSeal;
    var publicKey = homoSeal.keyGenerator.createPublicKey();
    publicKey.load(homoSeal.context, this.te.encode(pubkData));
    const encryptor = homoSeal.seal.Encryptor(homoSeal.context, publicKey);
    plainText = homoSeal.encoder.encode(Int32Array.from(this.te.encode(plainText)));
    const cipherText: any = encryptor.encrypt(plainText);
    return cipherText.save();
  }

  public async generateHomoKeys() {
    const publicKey = (await this.homoSeal).keyGenerator.createPublicKey();
    const privateKey = (await this.homoSeal).keyGenerator.secretKey();

    return {
      publicKey: publicKey,
      privateKey: privateKey,
      pubkData: publicKey.save(),
    };
  }

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
  private toArrayBuffer = (arr) => {
    var buf = new ArrayBuffer(arr.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = arr.length; i < strLen; i++) {
      bufView[i] = arr[i];
    }
    return buf;
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
  public async getShaHash(subtle, msg) {
    return Array.from(
      new Uint32Array(await subtle.digest('SHA-512', this.te.encode(msg)))
    )
      .map((byte) => ('00' + byte.toString(32)).slice(-2))
      .join('');
  }
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
  public async generateRsaKeys(subtle) {
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
      pubkData: (await subtle.exportKey('jwk', publicKey)).n,
    };
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
  public async importRsaKey(subtle, keyData, format = 'jwk', hash = 'SHA-512') {
    const key = await subtle.importKey(
      format,
      {
        alg: 'RSA-OAEP-512',
        e: 'AQAB',
        ext: true,
        key_ops: ['encrypt', 'decrypt'],
        kty: 'RSA',
        n: keyData,
      },
      {
        name: 'RSA-OAEP',
        hash,
      },
      true,
      ['encrypt']
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
    var rsaPublicKey = await this.importRsaKey(subtle, rsaPubkData);
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
