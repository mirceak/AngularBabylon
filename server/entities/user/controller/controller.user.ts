// import * as jwt from 'jsonwebtoken';
import BaseController from '../../../controllers/base/base.controller';
import cipher from '../../../../client/src/cipher';
import { readFileSync, writeFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import * as SchemaUser from '../../../entities/user/schema/schema.user';
import User from '../schema/schema.user';
const { subtle, getRandomValues } = require('crypto').webcrypto;

var jwtSessionTokenAesKey;
var generateAesKey = async () => {
  jwtSessionTokenAesKey = await cipher.generateAesKey(subtle);
  writeFileSync('./server/certs/jwtSessionTokenAesKey.json', Buffer.from(new TextEncoder().encode(jwtSessionTokenAesKey.pubkData)));
};
try {
  jwtSessionTokenAesKey = readFileSync('./server/certs/jwtSessionTokenAesKey.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenAesKey || !jwtSessionTokenAesKey.length) {
    await generateAesKey();
  }
  jwtSessionTokenAesKey = readFileSync('./server/certs/jwtSessionTokenAesKey.json', 'utf-8');
  jwtSessionTokenAesKey = await cipher.importAesKey(subtle, jwtSessionTokenAesKey);
})();

var jwtSessionTokenElipticKey;
var generateElipticKey = async () => {
  jwtSessionTokenElipticKey = await cipher.generateElipticKey(subtle);
  writeFileSync(
    './server/certs/jwtSessionTokenElipticKey.json',
    Buffer.from(new TextEncoder().encode(jwtSessionTokenElipticKey.privkData))
  );
};
try {
  jwtSessionTokenElipticKey = readFileSync('./server/certs/jwtSessionTokenElipticKey.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenElipticKey || !jwtSessionTokenElipticKey.length) {
    await generateElipticKey();
  }
  jwtSessionTokenElipticKey = readFileSync('./server/certs/jwtSessionTokenElipticKey.json', 'utf-8');
  jwtSessionTokenElipticKey = await cipher.importElipticKey(subtle, jwtSessionTokenElipticKey);
})();

var jwtSessionTokenRsaKeys;
var generateRsaKey = async () => {
  jwtSessionTokenRsaKeys = await cipher.generateRsaKeys(subtle, 'jwk');
  writeFileSync(
    './server/certs/jwtSessionTokenRsaKeys.json',
    Buffer.from(
      new TextEncoder().encode(JSON.stringify({ privkData: jwtSessionTokenRsaKeys.privkData, pubkData: jwtSessionTokenRsaKeys.pubkData }))
    )
  );
};
try {
  jwtSessionTokenRsaKeys = readFileSync('./server/certs/jwtSessionTokenRsaKeys.json', 'utf-8');
} catch (error) {}
(async () => {
  if (!jwtSessionTokenRsaKeys || !jwtSessionTokenRsaKeys.length) {
    await generateRsaKey();
  }
  jwtSessionTokenRsaKeys = readFileSync('./server/certs/jwtSessionTokenRsaKeys.json', 'utf-8');
  jwtSessionTokenRsaKeys = JSON.parse(jwtSessionTokenRsaKeys);
  jwtSessionTokenRsaKeys.publicKey = await cipher.importRsaKey(subtle, jwtSessionTokenRsaKeys.pubkData, true);
  jwtSessionTokenRsaKeys.privateKey = await cipher.importRsaKey(subtle, jwtSessionTokenRsaKeys.privkData);
})();

class ControllerUser extends BaseController {
  Entity = SchemaUser.default;

  str2ab = (str) => {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };
  preLogin = async (req, res) => {
    const p1 = req.body.email;
    await User.SchemaUser.findOne({ email: p1 }, async (err, user) => {
      if (!user) {
        return res.send(err);
      }
      const ph2 = user.username;
      const ph3 = user.password;

      const rsaPubkData = req.body.rsaPubkData;
      const rsaKeys_0 = await cipher.generateRsaKeys(subtle, 'jwk');
      const rsaEncryptedAesKey = await cipher.getRsaEncryptedAesKey(subtle, rsaPubkData);
      const userHash = await cipher.getShaHash(
        subtle,
        JSON.stringify({
          initialRsaPubkData: req.body.rsaPubkData,
          initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
        })
      );
      var fullHash = await cipher.getShaHash(
        subtle,
        await cipher.getShaHash(
          subtle,
          JSON.stringify({
            username: ph2,
            password: ph3,
            initialRsaPubkData: rsaPubkData,
            initialAesPubkData: rsaEncryptedAesKey.aesPubkData,
          }).substr(0, 6)
        )
      );
      var totalHash = await cipher.getShaHash(
        subtle,
        await cipher.getShaHash(
          subtle,
          JSON.stringify({
            userHash: userHash,
            fullHash: fullHash,
          })
        )
      );
      var aesEncrypted = await cipher.aesEncrypt(
        subtle,
        JSON.stringify({ rsaPubkData: rsaKeys_0.pubkData }),
        rsaEncryptedAesKey.aesKey,
        totalHash
      );
      var jwtToken = await jwt.sign(
        {
          user: {
            email: p1,
          },
          totalHash: totalHash,
          fullHash: fullHash,
          userHash: userHash,
          rsaKeys_0: rsaKeys_0.privkData,
        },
        jwtSessionTokenElipticKey,
        { algorithm: 'ES512' }
      );
      var aesIv = new TextDecoder().decode(getRandomValues(new Uint8Array(12)));
      var rsaEncryptedAesIv = await cipher.rsaEncrypt(subtle, aesIv, jwtSessionTokenRsaKeys.publicKey);
      var aesEncryptedJwtToken = await cipher.aesEncrypt(subtle, jwtToken, jwtSessionTokenAesKey, aesIv);
      res.send({
        jwt: {
          aesToken: String.fromCharCode.apply(null, new Uint8Array(aesEncryptedJwtToken.ciphertext)),
          rsaIv: String.fromCharCode.apply(null, new Uint8Array(rsaEncryptedAesIv)),
        },
        rsaEncryptedAesKey: String.fromCharCode.apply(null, new Uint8Array(rsaEncryptedAesKey.rsaEncryptedAes)),
        aesEncrypted: String.fromCharCode.apply(null, new Uint8Array(aesEncrypted.ciphertext)),
      });
    });
  };

  login = async (req, res) => {
    req.body = {
      rsaPubkData: req.body.rsaPubkData,
      aesEncrypted: this.str2ab(req.body.aesEncrypted),
      rsaEncryptedAesKey: this.str2ab(req.body.rsaEncryptedAesKey),
      jwt: {
        aesToken: this.str2ab(req.body.jwt.aesToken),
        rsaIv: this.str2ab(req.body.jwt.rsaIv),
      },
    };
    var jwtToken = req.body.jwt;

    jwtToken.rsaIv = await cipher.rsaDecrypt(subtle, jwtToken.rsaIv, jwtSessionTokenRsaKeys.privateKey);
    jwtToken.data = await cipher.aesDecrypt(subtle, jwtToken.aesToken, jwtSessionTokenAesKey, jwtToken.rsaIv);
    jwtToken.data = await jwt.verify(jwtToken.data, jwtSessionTokenElipticKey, { algorithms: ['ES512'] });

    jwtToken.data.rsaKeys_0 = await cipher.importRsaKey(subtle, jwtToken.data.rsaKeys_0);
    var finalHash = await cipher.getShaHash(
      subtle,
      JSON.stringify({
        totalHash: jwtToken.data.totalHash,
        fullHash: jwtToken.data.fullHash,
        userHash: jwtToken.data.userHash,
        rsaPubkData: req.body.rsaPubkData,
        rsaEncryptedAesKey: new TextDecoder().decode(req.body.rsaEncryptedAesKey),
      })
    );
    var rsaDecryptedAesKey = await cipher.rsaDecrypt(subtle, req.body.rsaEncryptedAesKey, jwtToken.data.rsaKeys_0);
    var aesKey = await cipher.importAesKey(subtle, rsaDecryptedAesKey);
    var aesDecrypted = await cipher.aesDecrypt(subtle, req.body.aesEncrypted, aesKey, finalHash);
    var _cipher = JSON.parse(aesDecrypted);
    _cipher = {
      lock: cipher.fromString(_cipher.cipherLock),
      dataLock: cipher.fromString(_cipher.cipherDataLock),
    };
    var rsaEncryptedAesKeyHash = await cipher.getShaHash(subtle, new TextDecoder().decode(req.body.rsaEncryptedAesKey));
    var cipherData = cipher.unlock(_cipher, [jwtToken.data.userHash, jwtToken.data.fullHash, rsaEncryptedAesKeyHash, finalHash]);
    var json: any = JSON.parse(cipherData);

    await User.SchemaUser.findOne({ email: jwtToken.data.user.email }, async (err, user) => {
      user.comparePassword(json.password, json.username, async (error, isMatch) => {
        res.send({
          token: await jwt.sign(
            {
              loggedIn: true,
            },
            jwtSessionTokenElipticKey,
            { algorithm: 'ES512' }
          ),
        });
      });
    });
  };

  getRouter() {
    let router = super.getRouter();
    router.route('/preLogin').post(this.preLogin);
    router.route('/login').post(this.login);
    return router;
  }
}

export default ControllerUser;
