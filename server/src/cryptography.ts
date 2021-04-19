class Cryptography {
  private letters: Array<string> = [
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
  private numbers: Array<string> = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  private characters: Array<string> = [
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
  ];
  private fakeCharacters: Array<string> = [
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
  ];
  fakeCheck =
    this.fakeCharacters.length >= 10
      ? undefined
      : (() => {
          throw new Error("Fake characters should have a min length of 10");
        })();

  constructor(private webcrypto: any) {}

  private originalMapNoFakes: string[] = [
    ...this.letters,
    ...this.numbers,
    ...this.characters,
  ];

  private originalMap: string[] = [
    ...this.letters,
    ...this.numbers,
    ...this.characters,
    ...this.fakeCharacters,
  ];
  private td = new TextDecoder();
  private te = new TextEncoder();

  private randomThreshold = 128;

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
  public engraveData(
    lock,
    dataLock,
    password,
    message: string,
    i = 0,
    row = null,
    passChar = null,
    rowMessageIndex = 0,
    output = [],
    messageChar = null
  ) {
    message = message
      .split("")
      .map((current, index) => {
        const passChar = password[index % password.length].charCodeAt(0);
        const messageChar = message[index % message.length].charCodeAt(0);
        var diff1 = (
          Math.max(passChar, messageChar) - Math.min(passChar, messageChar)
        ).toString();
        if (+diff1 >= 10) {
          diff1 = diff1.charAt(1);
        }
        var diff2;
        if (+diff1 >= 100) {
          diff2 = diff1.charAt(2);
        } else {
          diff2 = 10 - +diff1;
        }
        return (
          current +
          ((Math.random() < 0.2 && Math.random() % 2 == 0) ||
          (Math.random() > 0.8 && Math.random() % 3 == 0) ||
          (Math.random() > 0.4 && Math.random() < 0.6)
            ? this.fakeCharacters
                .slice(Math.min(+diff1, +diff2), Math.max(+diff1, +diff2))
                .join("")
            : "")
        );
      })
      .join("");
    message = this.lockMessage(message, dataLock);
    lock = JSON.parse(JSON.stringify(lock));
    for (i = 0; i < message.length; i++) {
      row = lock[i % lock.length];
      passChar = password[i % password.length];
      messageChar = message[i % message.length];
      rowMessageIndex = row.indexOf(messageChar);
      output.push(
        String.fromCharCode(
          this.originalMap[rowMessageIndex].charCodeAt(0) +
            password.charCodeAt(i % password.length)
        )
      );
      if (i % lock.length == 0) {
        lock = this.lockMap(lock, dataLock);
      }
    }
    return Buffer.from(output.join(""), "utf-8").toString("base64");
  }
  public degraveData(lock, dataLock, output, password) {
    var originalInputIndex = 0;
    var i;
    var unlocked = "";
    lock = JSON.parse(JSON.stringify(lock));
    output = Buffer.from(output, "base64").toString("utf-8");
    for (i = 0; i < output.length; i++) {
      originalInputIndex = this.originalMap.indexOf(
        String.fromCharCode(
          output[i % output.length].charCodeAt(0) -
            password.charCodeAt(i % password.length)
        )
      );
      unlocked += lock[i % lock.length][originalInputIndex];
      if (i % lock.length == 0) {
        lock = this.lockMap(lock, dataLock);
      }
    }
    unlocked = this.unlockMessage(unlocked, dataLock);
    return unlocked
      .split("")
      .filter((current) => {
        return this.originalMapNoFakes.indexOf(current) !== -1;
      })
      .join("");
  }
  public unlockCipherMap = (cipher: any, passwords, unlocked = ""): string => {
    cipher.dataLock = this.unShiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
    cipher.lock = this.unShiftElements(cipher.lock, cipher.dataLock, passwords);
    cipher.dataLock = this.unShiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
    unlocked = this.degraveData(
      cipher.lock,
      cipher.dataLock,
      cipher.output,
      passwords.reduce((total, current) => {
        return total + current;
      }, "")
    );
    return unlocked;
  };
  public makeCipherPieces(
    dataLockLength = 0,
    dataLock = null,
    lock = null
  ): any {
    dataLockLength =
      dataLockLength ||
      this.randomThreshold + Math.random() * this.randomThreshold;
    dataLock = this.generateLock(Math.max(10, dataLockLength / 10));
    lock = this.generateLock(dataLockLength);
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
  public makeCipherMap = async (
    passwords,
    data: string,
    cipher = null
  ): Promise<any> => {
    cipher = this.makeCipherPieces(10);
    var output = this.engraveData(
      cipher.lock,
      cipher.dataLock,
      passwords.reduce((total, current) => {
        return total + current;
      }, ""),
      data
    );
    cipher.dataLock = this.shiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
    cipher.lock = this.shiftElements(cipher.lock, cipher.dataLock, passwords);
    cipher.dataLock = this.shiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
    return {
      output: output,
      lock: this.toString(cipher.lock),
      dataLock: this.toString(cipher.dataLock),
    };
  };
  private lockMessage(
    message: string,
    lock: string[][],
    locked = "",
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
    unlocked = "",
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
        map[i][j] = lock[i % lock.length][this.originalMap.indexOf(map[i][j])];
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
        map[i][j] = this.originalMap[lock[i % lock.length].indexOf(map[i][j])];
      }
    }
    return map;
  };

  public async getShaHash(msg) {
    this.shaBytes = Array.from(
      new Uint32Array(
        await this.webcrypto.subtle.digest("SHA-512", this.te.encode(msg))
      )
    );
    this.shaBytes = this.shaBytes.map((byte) => {
      return ("00" + byte.toString(32)).slice(-2);
    });
    this.shaHash = this.shaBytes.join("");
    return this.shaHash;
  }
  public toString = (lock: string[][], result = null): string => {
    result = lock.reduce((total, current) => {
      total += current.join("");
      return total;
    }, "");
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
  public async rsaEncrypt(plaintext, key, encrypted = null) {
    encrypted = await this.webcrypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      this.te.encode(plaintext)
    );
    return encrypted;
  }
  public async aesEncrypt(
    plaintext,
    key,
    iv = "someRandomIvThatNeedsChanging",
    ciphertext = null
  ) {
    ciphertext = await this.webcrypto.subtle.encrypt(
      {
        name: "AES-GCM",
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
  public async rsaDecrypt(ciphertext, key, plaintext = null) {
    plaintext = await this.webcrypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async aesDecrypt(ciphertext, key, iv, plaintext = null) {
    plaintext = await this.webcrypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: this.te.encode(iv),
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async generateRsaKeys(format, keys = null) {
    keys = await this.webcrypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {
          name: "SHA-512",
        },
      },
      true,
      ["encrypt", "decrypt"]
    );
    return {
      publicKey: keys.publicKey,
      privateKey: keys.privateKey,
      pubkData: JSON.stringify(
        await this.webcrypto.subtle.exportKey(format, keys.publicKey)
      ),
      privkData: JSON.stringify(
        await this.webcrypto.subtle.exportKey(format, keys.privateKey)
      ),
    };
  }
  public async generateElipticKey(keys = null) {
    keys = await this.webcrypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-521",
      },
      true,
      ["sign", "verify"]
    );
    return {
      privkData: JSON.stringify(
        await this.webcrypto.subtle.exportKey("jwk", keys.privateKey)
      ),
    };
  }
  public async importElipticKey(data, pub = false, key = null) {
    key = await this.webcrypto.subtle.importKey(
      "jwk",
      JSON.parse(data),
      {
        name: "ECDSA",
        namedCurve: "P-521",
      },
      true,
      [pub ? "verify" : "sign"]
    );
    return await this.webcrypto.subtle.exportKey("node.keyObject", key);
  }
  public async generateAesKey(key = null) {
    key = await this.webcrypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    return {
      publicKey: key,
      privateKey: key,
      pubkData: (await this.webcrypto.subtle.exportKey("jwk", key)).k,
    };
  }
  public async importRsaKey(keyData, pub = false, key = null) {
    key = await this.webcrypto.subtle.importKey(
      "jwk",
      JSON.parse(keyData),
      {
        name: "RSA-OAEP",
        hash: "SHA-512",
      },
      true,
      [pub ? "encrypt" : "decrypt"]
    );
    return key;
  }
  public async importAesKey(keyData, format = "jwk", key = null) {
    key = await this.webcrypto.subtle.importKey(
      format,
      {
        key_ops: ["encrypt", "decrypt"],
        ext: true,
        kty: "oct",
        k: keyData,
        alg: "A256GCM",
      },
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    return key;
  }
  public async getRsaEncryptedAesKey(
    rsaPubkData,
    rsaPublicKey = null,
    aesKey = null,
    encryptedAes = null
  ) {
    rsaPublicKey = await this.importRsaKey(rsaPubkData, true);
    aesKey = await this.generateAesKey();
    encryptedAes = await this.rsaEncrypt(aesKey.pubkData, rsaPublicKey);
    return {
      encryptedAes: encryptedAes,
      rsaPublicKey: rsaPublicKey,
      aesKey: aesKey.privateKey,
      aesPubkData: aesKey.pubkData,
    };
  }

  public str2ab(str, buf = null, bufView = null, i = 0, strLen = 0) {
    buf = new ArrayBuffer(str.length);
    bufView = new Uint8Array(buf);
    for (i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  public ab2str(str) {
    return [...new Uint8Array(str)]
      .map((curent) => {
        return String.fromCharCode(curent);
      })
      .join("");
  }
}

export default Cryptography;
