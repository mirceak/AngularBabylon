import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../certs/jwtSessionToken/jwtSessionToken";

var getRequestData = async (data) => {
    var sessionJwt = await Cryptography.parseJwtSessionToken(
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
            sessionJwt: await Cryptography.signJwtSessionToken(
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

  export default {
    getRequestData,
    encryptResponseData
  };