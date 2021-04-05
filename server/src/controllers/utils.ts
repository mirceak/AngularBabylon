import {
  jwtSessionToken,
  Cryptography,
  jwt,
  getRandomValues,
} from "../certs/jwtSessionToken/jwtSessionToken";

var getRequestData = async (data) => {
  var sessionJwt = await parseJwtSessionToken(
    data.sessionJwt,
    jwtSessionToken,
    jwt
  );
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
  return {
    sessionJwt: sessionJwt,
    decryptedData: decryptedData,
  };
};

var encryptResponseData = async (reqData, data) => {
  var nextRsa = await Cryptography.generateRsaKeys("jwk");
  var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
    reqData.decryptedData.nextRsa
  );
  var aesEncrypted = await Cryptography.aesEncrypt(
    JSON.stringify({
      data: data,
      token: await jwt.sign(
        {
          nextRsa: nextRsa.pubkData,
          sessionJwt: await signJwtSessionToken(
            {
              identity: reqData.sessionJwt.identity,
              rsaKeyPriv: nextRsa.privkData,
              rsaKeyPub: nextRsa.pubkData,
            },
            jwtSessionToken,
            jwt
          ),
        },
        jwtSessionToken.jwtSessionTokenElipticKey,
        { algorithm: "ES512" }
      ),
    }),
    rsaEncryptedAes.aesKey,
    reqData.decryptedData.nextRsa
  );
  return {
    rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
    aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
  };
};

var parseJwtSessionToken = async (sessionJwt, jwtSessionToken, jwt) => {
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
  return await jwt.verify(
    sessionJwt,
    jwtSessionToken.jwtSessionTokenElipticKey,
    { algorithms: ["ES512"] }
  );
};

var signJwtSessionToken = async (postData, jwtSessionToken, jwt) => {
  var aesIv = null;
  var rsaEncryptedAesIv = null;
  var aesEncryptedJwtToken = null;
  var sessionJwtToken = await jwt.sign(
    postData,
    jwtSessionToken.jwtSessionTokenElipticKey,
    { algorithm: "ES512" }
  );
  aesIv = Cryptography.ab2str(getRandomValues(new Uint8Array(12)));
  rsaEncryptedAesIv = await Cryptography.rsaEncrypt(
    aesIv,
    jwtSessionToken.jwtSessionTokenRsaKeys.publicKey
  );
  aesEncryptedJwtToken = await Cryptography.aesEncrypt(
    sessionJwtToken,
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
};
