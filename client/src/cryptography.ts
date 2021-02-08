class Cryptography {
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

  constructor(private webcrypto: any) {}

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
    cipher.dataLock = this.unShiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
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
  public async signRegisterSessionData(
    postData,
    options = {
      sessionJwt: postData.sessionJwt,
      rsaEncryptedAesKey: this.str2ab(postData.rsaEncryptedAesKey),
      aesEncrypted: this.str2ab(postData.aesEncrypted),
      referralEmail: postData.referralEmail,
      referralCode: postData.referralCode,
      username: postData.username,
      password: postData.password,
      email: postData.email,
    },
    rsaKeys_1 = null,
    rsaDecryptedAesKey = null,
    aesKey = null,
    userHash = null,
    fullHash = null,
    totalHash = null,
    decryptedAes = null,
    rsaEncryptedAesKey = null,
    finalHash = null,
    rsaEncryptedAesKeyHash = null,
    cipherMap = null,
    aesEncrypted = null
  ) {
    rsaKeys_1 = await this.generateRsaKeys('jwk');
    rsaDecryptedAesKey = await this.rsaDecrypt(
      options.rsaEncryptedAesKey,
      postData.rsaKeys_0.privateKey
    );
    aesKey = await this.importAesKey(rsaDecryptedAesKey);
    userHash = await this.getShaHash(
      JSON.stringify({
        initialRsaPubkData: postData.rsaKeys_0.pubkData,
        initialAesPubkData: rsaDecryptedAesKey,
      })
    );
    fullHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          referralEmail: options.referralEmail,
          referralCode: options.referralCode,
          initialRsaPubkData: postData.rsaKeys_0.pubkData,
          initialAesPubkData: rsaDecryptedAesKey,
        }).substr(0, 6)
      )
    );
    totalHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          userHash: userHash,
          fullHash: fullHash,
        })
      )
    );
    decryptedAes = JSON.parse(
      await this.aesDecrypt(options.aesEncrypted, aesKey, totalHash)
    );
    rsaEncryptedAesKey = await this.getRsaEncryptedAesKey(
      decryptedAes.rsaPubkData
    );
    finalHash = await this.getShaHash(
      JSON.stringify({
        totalHash: totalHash,
        fullHash: fullHash,
        userHash: userHash,
        rsaPubkData: rsaKeys_1.pubkData,
        rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      })
    );
    rsaEncryptedAesKeyHash = await this.getShaHash(
      this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes)
    );
    cipherMap = await this.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        username: options.username,
        password: options.password,
      })
    );
    aesEncrypted = await this.aesEncrypt(
      JSON.stringify({
        cipherLock: cipherMap.lock,
        cipherDataLock: cipherMap.dataLock,
      }),
      rsaEncryptedAesKey.aesKey,
      finalHash
    );
    return {
      sessionJwt: options.sessionJwt,
      aesEncrypted: this.ab2str(aesEncrypted.ciphertext),
      rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      rsaPubkData: rsaKeys_1.pubkData,
    };
  }
  public async signLoginSessionData(
    postData,
    ph2 = null,
    ph3 = null,
    options = {
      sessionJwt: postData.sessionJwt,
      rsaEncryptedAesKey: this.str2ab(postData.rsaEncryptedAesKey),
      aesEncrypted: this.str2ab(postData.aesEncrypted),
      p2: ph2,
      p3: ph3,
      username: postData.username,
      password: postData.password,
    },
    rsaKeys_1 = null,
    rsaDecryptedAesKey = null,
    aesKey = null,
    userHash = null,
    fullHash = null,
    totalHash = null,
    decryptedAes = null,
    rsaEncryptedAesKey = null,
    finalHash = null,
    rsaEncryptedAesKeyHash = null,
    cipherMap = null,
    aesEncrypted = null
  ) {
    ph2 = await this.getShaHash(postData.username);
    ph3 = await this.getShaHash(postData.password);
    rsaKeys_1 = await this.generateRsaKeys('jwk');
    rsaDecryptedAesKey = await this.rsaDecrypt(
      options.rsaEncryptedAesKey,
      postData.rsaKeys_0.privateKey
    );
    aesKey = await this.importAesKey(rsaDecryptedAesKey);
    userHash = await this.getShaHash(
      JSON.stringify({
        initialRsaPubkData: postData.rsaKeys_0.pubkData,
        initialAesPubkData: rsaDecryptedAesKey,
      })
    );
    fullHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          username: options.p2,
          password: options.p3,
          initialRsaPubkData: postData.rsaKeys_0.pubkData,
          initialAesPubkData: rsaDecryptedAesKey,
        }).substr(0, 6)
      )
    );
    totalHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          userHash: userHash,
          fullHash: fullHash,
        })
      )
    );
    decryptedAes = JSON.parse(
      await this.aesDecrypt(options.aesEncrypted, aesKey, totalHash)
    );
    rsaEncryptedAesKey = await this.getRsaEncryptedAesKey(
      decryptedAes.rsaPubkData
    );
    finalHash = await this.getShaHash(
      JSON.stringify({
        totalHash: totalHash,
        fullHash: fullHash,
        userHash: userHash,
        rsaPubkData: rsaKeys_1.pubkData,
        rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      })
    );
    rsaEncryptedAesKeyHash = await this.getShaHash(
      this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes)
    );
    cipherMap = await this.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        username: options.username,
        password: options.password,
      })
    );
    aesEncrypted = await this.aesEncrypt(
      JSON.stringify({
        cipherLock: cipherMap.lock,
        cipherDataLock: cipherMap.dataLock,
      }),
      rsaEncryptedAesKey.aesKey,
      finalHash
    );
    return {
      sessionJwt: options.sessionJwt,
      aesEncrypted: this.ab2str(aesEncrypted.ciphertext),
      rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      rsaPubkData: rsaKeys_1.pubkData,
    };
  }
  public async parseJwtSessionToken(sessionJwt, jwtSessionToken, jwt) {
    sessionJwt = {
      aesToken: this.str2ab(sessionJwt.aesToken),
      rsaIv: this.str2ab(sessionJwt.rsaIv),
    };
    sessionJwt.rsaIv = await this.rsaDecrypt(
      sessionJwt.rsaIv,
      jwtSessionToken.jwtSessionTokenRsaKeys.privateKey
    );
    sessionJwt = await this.aesDecrypt(
      sessionJwt.aesToken,
      jwtSessionToken.jwtSessionTokenAesKey,
      sessionJwt.rsaIv
    );
    return await jwt.verify(
      sessionJwt,
      jwtSessionToken.jwtSessionTokenElipticKey,
      { algorithms: ['ES512'] }
    );
  }
  public async validateRegisterSessionData(
    jwtSessionToken,
    postData,
    jwt,
    finalHash = null,
    rsaDecryptedAesKey = null,
    aesKey = null,
    aesDecrypted = null,
    cipherMap = null,
    rsaEncryptedAesKeyHash = null,
    cipherData = null,
    json = null
  ) {
    postData.aesEncrypted = this.str2ab(postData.aesEncrypted);
    postData.rsaEncryptedAesKey = this.str2ab(postData.rsaEncryptedAesKey);
    postData.sessionJwt = await this.parseJwtSessionToken(
      postData.sessionJwt,
      jwtSessionToken,
      jwt
    );
    postData.sessionJwt.rsaKeys_0 = await this.importRsaKey(
      postData.sessionJwt.rsaKeys_0
    );
    finalHash = await this.getShaHash(
      JSON.stringify({
        totalHash: postData.sessionJwt.totalHash,
        fullHash: postData.sessionJwt.fullHash,
        userHash: postData.sessionJwt.userHash,
        rsaPubkData: postData.rsaPubkData,
        rsaEncryptedAesKey: this.ab2str(postData.rsaEncryptedAesKey),
      })
    );
    rsaDecryptedAesKey = await this.rsaDecrypt(
      postData.rsaEncryptedAesKey,
      postData.sessionJwt.rsaKeys_0
    );
    aesKey = await this.importAesKey(rsaDecryptedAesKey);
    aesDecrypted = await this.aesDecrypt(
      postData.aesEncrypted,
      aesKey,
      finalHash
    );
    cipherMap = JSON.parse(aesDecrypted);
    cipherMap = {
      lock: this.fromString(cipherMap.cipherLock),
      dataLock: this.fromString(cipherMap.cipherDataLock),
    };
    rsaEncryptedAesKeyHash = await this.getShaHash(
      this.ab2str(postData.rsaEncryptedAesKey)
    );
    cipherData = this.unlock(cipherMap, [
      finalHash,
      postData.sessionJwt.userHash,
      postData.sessionJwt.fullHash,
      postData.sessionJwt.totalHash,
      rsaEncryptedAesKeyHash,
    ]);
    json = JSON.parse(cipherData);
    return {
      json: json,
      sessionJwt: await this.signJwtSessionToken(
        {
          email: postData.sessionJwt.email,
          referrals: postData.sessionJwt.referrals,
          username: postData.sessionJwt.username,
          password: postData.sessionJwt.password,
          totalHash: postData.sessionJwt.totalHash,
          fullHash: postData.sessionJwt.fullHash,
          userHash: postData.sessionJwt.userHash,
          rsaKeys_0: postData.sessionJwt.rsaKeys_0.privkData,
        },
        jwtSessionToken,
        jwt
      ),
    };
  }
  public async validateLoginSessionData(
    jwtSessionToken,
    postData,
    jwt,
    finalHash = null,
    rsaDecryptedAesKey = null,
    aesKey = null,
    aesDecrypted = null,
    cipherMap = null,
    rsaEncryptedAesKeyHash = null,
    cipherData = null,
    json = null,
    ph2 = null,
    ph3 = null
  ) {
    postData.aesEncrypted = this.str2ab(postData.aesEncrypted);
    postData.rsaEncryptedAesKey = this.str2ab(postData.rsaEncryptedAesKey);
    postData.sessionJwt = await this.parseJwtSessionToken(
      postData.sessionJwt,
      jwtSessionToken,
      jwt
    );
    postData.sessionJwt.rsaKeys_0 = await this.importRsaKey(
      postData.sessionJwt.rsaKeys_0
    );
    finalHash = await this.getShaHash(
      JSON.stringify({
        totalHash: postData.sessionJwt.totalHash,
        fullHash: postData.sessionJwt.fullHash,
        userHash: postData.sessionJwt.userHash,
        rsaPubkData: postData.rsaPubkData,
        rsaEncryptedAesKey: this.ab2str(postData.rsaEncryptedAesKey),
      })
    );
    rsaDecryptedAesKey = await this.rsaDecrypt(
      postData.rsaEncryptedAesKey,
      postData.sessionJwt.rsaKeys_0
    );
    aesKey = await this.importAesKey(rsaDecryptedAesKey);
    aesDecrypted = await this.aesDecrypt(
      postData.aesEncrypted,
      aesKey,
      finalHash
    );
    cipherMap = JSON.parse(aesDecrypted);
    cipherMap = {
      lock: this.fromString(cipherMap.cipherLock),
      dataLock: this.fromString(cipherMap.cipherDataLock),
    };
    rsaEncryptedAesKeyHash = await this.getShaHash(
      this.ab2str(postData.rsaEncryptedAesKey)
    );
    cipherData = this.unlock(cipherMap, [
      finalHash,
      postData.sessionJwt.userHash,
      postData.sessionJwt.fullHash,
      postData.sessionJwt.totalHash,
      rsaEncryptedAesKeyHash,
    ]);
    json = JSON.parse(cipherData);
    ph2 = await this.getShaHash(json.username);
    ph3 = await this.getShaHash(json.password);
    if (
      ph2 == postData.sessionJwt.username &&
      ph3 == postData.sessionJwt.password
    ) {
      return {
        token: await jwt.sign(
          {
            user: {
              email: postData.sessionJwt.email,
              referrals: postData.sessionJwt.referrals,
            },
            sessionJwt: await this.signJwtSessionToken(
              {
                email: postData.sessionJwt.email,
                referrals: postData.sessionJwt.referrals,
                username: postData.sessionJwt.username,
                password: postData.sessionJwt.password,
                totalHash: postData.sessionJwt.totalHash,
                fullHash: postData.sessionJwt.fullHash,
                userHash: postData.sessionJwt.userHash,
                rsaKeys_0: postData.sessionJwt.rsaKeys_0.privkData,
              },
              jwtSessionToken,
              jwt
            ),
          },
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithm: 'ES512' }
        ),
      };
    }
  }
  public async generateRegisterSessionData(
    jwtSessionToken,
    postData,
    jwt,
    rsaPubkData = postData.rsaPubkData,
    rsaKeys_0 = null,
    rsaEncryptedAesKey = null,
    userHash = null,
    fullHash = null,
    totalHash = null,
    aesEncrypted = null
  ) {
    rsaKeys_0 = await this.generateRsaKeys('jwk');
    rsaEncryptedAesKey = await this.getRsaEncryptedAesKey(rsaPubkData);
    userHash = await this.getShaHash(
      JSON.stringify({
        initialRsaPubkData: rsaPubkData,
        initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
      })
    );
    fullHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          referralEmail: postData.referralEmail,
          referralCode: postData.referralCode,
          initialRsaPubkData: rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        }).substr(0, 6)
      )
    );
    totalHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          userHash: userHash,
          fullHash: fullHash,
        })
      )
    );
    aesEncrypted = await this.aesEncrypt(
      JSON.stringify({ rsaPubkData: rsaKeys_0.pubkData }),
      rsaEncryptedAesKey.aesKey,
      totalHash
    );
    return {
      sessionJwt: await this.signJwtSessionToken(
        {
          email: postData.email,
          referralEmail: postData.referralEmail,
          referralCode: postData.referralCode,
          totalHash: totalHash,
          fullHash: fullHash,
          userHash: userHash,
          rsaKeys_0: rsaKeys_0.privkData,
        },
        jwtSessionToken,
        jwt
      ),
      rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      aesEncrypted: this.ab2str(aesEncrypted.ciphertext),
    };
  }
  public async generateLoginSessionData(
    jwtSessionToken,
    postData,
    jwt,
    rsaPubkData = postData.rsaPubkData,
    rsaKeys_0 = null,
    rsaEncryptedAesKey = null,
    userHash = null,
    fullHash = null,
    totalHash = null,
    aesEncrypted = null
  ) {
    rsaKeys_0 = await this.generateRsaKeys('jwk');
    rsaEncryptedAesKey = await this.getRsaEncryptedAesKey(rsaPubkData);
    userHash = await this.getShaHash(
      JSON.stringify({
        initialRsaPubkData: rsaPubkData,
        initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
      })
    );
    fullHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          username: postData.user.username,
          password: postData.user.password,
          initialRsaPubkData: rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        }).substr(0, 6)
      )
    );
    totalHash = await this.getShaHash(
      await this.getShaHash(
        JSON.stringify({
          userHash: userHash,
          fullHash: fullHash,
        })
      )
    );
    aesEncrypted = await this.aesEncrypt(
      JSON.stringify({ rsaPubkData: rsaKeys_0.pubkData }),
      rsaEncryptedAesKey.aesKey,
      totalHash
    );
    return {
      sessionJwt: await this.signJwtSessionToken(
        {
          email: postData.user.email,
          referrals: postData.user.referrals,
          username: postData.user.username,
          password: postData.user.password,
          totalHash: totalHash,
          fullHash: fullHash,
          userHash: userHash,
          rsaKeys_0: rsaKeys_0.privkData,
        },
        jwtSessionToken,
        jwt
      ),
      rsaEncryptedAesKey: this.ab2str(rsaEncryptedAesKey.rsaEncryptedAes),
      aesEncrypted: this.ab2str(aesEncrypted.ciphertext),
    };
  }
  public async signJwtSessionToken(
    postData,
    jwtSessionToken,
    jwt,
    sessionJwtToken = null,
    aesIv = null,
    rsaEncryptedAesIv = null,
    aesEncryptedJwtToken = null
  ) {
    sessionJwtToken = await jwt.sign(
      postData,
      jwtSessionToken.jwtSessionTokenElipticKey,
      { algorithm: 'ES512' }
    );
    aesIv = this.ab2str(this.webcrypto.getRandomValues(new Uint8Array(12)));
    rsaEncryptedAesIv = await this.rsaEncrypt(
      aesIv,
      jwtSessionToken.jwtSessionTokenRsaKeys.publicKey
    );
    aesEncryptedJwtToken = await this.aesEncrypt(
      sessionJwtToken,
      jwtSessionToken.jwtSessionTokenAesKey,
      aesIv
    );
    return {
      aesToken: this.ab2str(aesEncryptedJwtToken.ciphertext),
      rsaIv: this.ab2str(rsaEncryptedAesIv),
    };
  }
  public makeCipherMap = async (
    passwords,
    data,
    cipher = this.makeCipherPieces(data.length)
  ): Promise<any> => {
    data = this.lockMessage(data, cipher.dataLock);
    this.engraveData(cipher.lock, passwords[0], data);
    cipher.lock = this.shiftElements(cipher.lock, cipher.dataLock, passwords);
    cipher.dataLock = this.shiftElements(
      cipher.dataLock,
      cipher.lock,
      passwords
    );
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
        await this.webcrypto.subtle.digest('SHA-512', this.te.encode(msg))
      )
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
  public async rsaEncrypt(plaintext, key, encrypted = null) {
    encrypted = await this.webcrypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      this.te.encode(plaintext)
    );
    return encrypted;
  }
  public async aesEncrypt(
    plaintext,
    key,
    iv = 'someRandomIvThatNeedsChaning',
    ciphertext = null
  ) {
    ciphertext = await this.webcrypto.subtle.encrypt(
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
  public async rsaDecrypt(ciphertext, key, plaintext = null) {
    plaintext = await this.webcrypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      ciphertext
    );
    return this.td.decode(plaintext);
  }
  public async aesDecrypt(ciphertext, key, iv, plaintext = null) {
    plaintext = await this.webcrypto.subtle.decrypt(
      {
        name: 'AES-GCM',
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
        name: 'ECDSA',
        namedCurve: 'P-521',
      },
      true,
      ['sign', 'verify']
    );
    return {
      privkData: JSON.stringify(
        await this.webcrypto.subtle.exportKey('jwk', keys.privateKey)
      ),
    };
  }
  public async importElipticKey(data, pub = false, key = null) {
    key = await this.webcrypto.subtle.importKey(
      'jwk',
      JSON.parse(data),
      {
        name: 'ECDSA',
        namedCurve: 'P-521',
      },
      true,
      [pub ? 'verify' : 'sign']
    );
    return await this.webcrypto.subtle.exportKey('node.keyObject', key);
  }
  public async generateAesKey(key = null) {
    key = await this.webcrypto.subtle.generateKey(
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
      pubkData: (await this.webcrypto.subtle.exportKey('jwk', key)).k,
    };
  }
  public async importRsaKey(keyData, pub = false, key = null) {
    key = await this.webcrypto.subtle.importKey(
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
  public async importAesKey(keyData, format = 'jwk', key = null) {
    key = await this.webcrypto.subtle.importKey(
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
    rsaPubkData,
    rsaPublicKey = null,
    aesKey = null,
    rsaEncryptedAes = null
  ) {
    rsaPublicKey = await this.importRsaKey(rsaPubkData, true);
    aesKey = await this.generateAesKey();
    rsaEncryptedAes = await this.rsaEncrypt(aesKey.pubkData, rsaPublicKey);
    return {
      rsaEncryptedAes,
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
    return String.fromCharCode.apply(null, new Uint8Array(str));
  }
}

export default Cryptography;
