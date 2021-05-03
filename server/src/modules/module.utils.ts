import {
  jwtSessionToken,
  Cryptography,
  jwt,
  getRandomValues,
} from "./module.jwtSessionToken";

var getRequestData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var sessionJwt: any = await parseJwtSessionToken(
        data.sessionJwt,
        jwtSessionToken,
        jwt
      );
    } catch (e) {
      return reject(e);
    }
    data.rsaEncryptedAes = Cryptography.str2ab(data.rsaEncryptedAes);
    data.aesEncrypted = Cryptography.str2ab(data.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(
      data.rsaEncryptedAes,
      jwtRsaKey
    );
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(
      await Cryptography.aesDecrypt(
        data.aesEncrypted,
        aesKey,
        sessionJwt.rsaKeyPub
      )
    );
    resolve({
      sessionJwt: sessionJwt,
      decryptedData: decryptedData,
    });
  });
};

var encryptResponseData = async (reqData, data) => {
  var nextRsa = await Cryptography.generateRsaKeys("jwk");
  var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
    reqData.decryptedData.nextRsa
  );
  var sessionJwt = await signJwtSessionToken(
    {
      identity: reqData.sessionJwt.identity,
      statePassword: reqData.sessionJwt.statePassword,
      rsaKeyPriv: nextRsa.privkData,
      rsaKeyPub: nextRsa.pubkData,
    },
    jwtSessionToken,
    jwt
  );
  var aesEncrypted = await Cryptography.aesEncrypt(
    JSON.stringify({
      data: data,
      token: await jwt.sign(
        {
          nextRsa: nextRsa.pubkData,
          sessionJwt: sessionJwt,
        },
        jwtSessionToken.jwtSessionTokenElipticKey,
        { expiresIn: 60 * 30, algorithm: "ES512" }
      ),
    }),
    rsaEncryptedAes.aesKey,
    reqData.decryptedData.nextRsa
  );
  return {
    sessionJwt: sessionJwt,
    rsaEncryptedAes: Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
    aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
  };
};

var parseJwtSessionToken = async (sessionJwt, jwtSessionToken, jwt) => {
  return new Promise(async (resolve, reject) => {
    sessionJwt = {
      aesToken: Cryptography.str2ab(sessionJwt.aesToken),
      rsaIv: Cryptography.str2ab(sessionJwt.rsaIv),
    };
    sessionJwt.rsaIv = await Cryptography.rsaDecrypt(
      sessionJwt.rsaIv,
      jwtSessionToken.jwtSessionTokenRsaKeys.privateKey
    );
    sessionJwt = await Cryptography.aesDecrypt(
      sessionJwt.aesToken,
      jwtSessionToken.jwtSessionTokenAesKey,
      sessionJwt.rsaIv
    );
    try {
      return resolve(
        await jwt.verify(
          deGraveData(sessionJwt),
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithms: ["ES512"] }
        )
      );
    } catch (e) {
      return reject(e);
    }
  });
};

var deGraveData = (data) => {
  return Cryptography.degraveData(
    jwtSessionToken.jwtSessionTokenLock.lock,
    jwtSessionToken.jwtSessionTokenLock.dataLock,
    data,
    jwtSessionToken.jwtSessionTokenLock.password[0]
  );
};

var engraveData = (data) => {
  return Cryptography.engraveData(
    jwtSessionToken.jwtSessionTokenLock.lock,
    jwtSessionToken.jwtSessionTokenLock.dataLock,
    jwtSessionToken.jwtSessionTokenLock.password[0],
    data
  );
};

var signJwtSessionToken = async (
  postData,
  jwtSessionToken,
  jwt,
  duration: number | boolean = 60 * 30
) => {
  var aesIv = null;
  var rsaEncryptedAesIv = null;
  var aesEncryptedJwtToken = null;
  var sessionJwtTokenOptions: any = {
    algorithm: "ES512",
  };
  if (duration !== false) {
    sessionJwtTokenOptions.expiresIn = duration;
  }
  var sessionJwtToken = await jwt.sign(
    postData,
    jwtSessionToken.jwtSessionTokenElipticKey,
    sessionJwtTokenOptions
  );
  aesIv = Cryptography.ab2str(getRandomValues(new Uint8Array(12)));
  rsaEncryptedAesIv = await Cryptography.rsaEncrypt(
    aesIv,
    jwtSessionToken.jwtSessionTokenRsaKeys.publicKey
  );
  aesEncryptedJwtToken = await Cryptography.aesEncrypt(
    engraveData(sessionJwtToken),
    jwtSessionToken.jwtSessionTokenAesKey,
    aesIv
  );
  return {
    aesToken: Cryptography.ab2str(aesEncryptedJwtToken.ciphertext),
    rsaIv: Cryptography.ab2str(rsaEncryptedAesIv),
  };
};

export default {
  parseJwtSessionToken,
  getRequestData,
  encryptResponseData,
  signJwtSessionToken,
  engraveData,
  deGraveData,
};
