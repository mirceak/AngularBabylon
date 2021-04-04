import { readFileSync, writeFileSync } from 'fs';
import * as _jwt from 'jsonwebtoken';
import _Cryptography from '../../../client/src/cryptography';
const webcrypto = require('crypto').webcrypto;
export var jwtSessionToken: any = {};
export var Cryptography: _Cryptography = new _Cryptography(webcrypto);
export var jwt = _jwt;
(async () => {
  var jwtSessionTokenAesKey;
  var jwtSessionTokenElipticKey;
  var jwtSessionTokenRsaKeys;
  var generateAesKey = async () => {
    jwtSessionTokenAesKey = await Cryptography.generateAesKey();
    writeFileSync(
      '../server/certs/jwtSessionToken/jwtSessionTokenAesKey.json',
      Buffer.from(new TextEncoder().encode(jwtSessionTokenAesKey.pubkData))
    );
  };
  try {
    jwtSessionTokenAesKey = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenAesKey.json', 'utf-8');
  } catch (error) {}
  if (!jwtSessionTokenAesKey || !jwtSessionTokenAesKey.length) {
    await generateAesKey();
  }
  jwtSessionTokenAesKey = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenAesKey.json', 'utf-8');
  jwtSessionTokenAesKey = await Cryptography.importAesKey(jwtSessionTokenAesKey);

  var generateElipticKey = async () => {
    jwtSessionTokenElipticKey = await Cryptography.generateElipticKey();
    writeFileSync(
      '../server/certs/jwtSessionToken/jwtSessionTokenElipticKey.json',
      Buffer.from(new TextEncoder().encode(jwtSessionTokenElipticKey.privkData))
    );
  };
  try {
    jwtSessionTokenElipticKey = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenElipticKey.json', 'utf-8');
  } catch (error) {}
  if (!jwtSessionTokenElipticKey || !jwtSessionTokenElipticKey.length) {
    await generateElipticKey();
  }
  jwtSessionTokenElipticKey = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenElipticKey.json', 'utf-8');
  jwtSessionTokenElipticKey = await Cryptography.importElipticKey(jwtSessionTokenElipticKey);

  var generateRsaKey = async () => {
    jwtSessionTokenRsaKeys = await Cryptography.generateRsaKeys('jwk');
    writeFileSync(
      '../server/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json',
      Buffer.from(
        new TextEncoder().encode(JSON.stringify({ privkData: jwtSessionTokenRsaKeys.privkData, pubkData: jwtSessionTokenRsaKeys.pubkData }))
      )
    );
  };
  try {
    jwtSessionTokenRsaKeys = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json', 'utf-8');
  } catch (error) {}
  if (!jwtSessionTokenRsaKeys || !jwtSessionTokenRsaKeys.length) {
    await generateRsaKey();
  }
  jwtSessionTokenRsaKeys = readFileSync('../server/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json', 'utf-8');
  jwtSessionTokenRsaKeys = JSON.parse(jwtSessionTokenRsaKeys);
  jwtSessionTokenRsaKeys.publicKey = await Cryptography.importRsaKey(jwtSessionTokenRsaKeys.pubkData, true);
  jwtSessionTokenRsaKeys.privateKey = await Cryptography.importRsaKey(jwtSessionTokenRsaKeys.privkData);

  jwtSessionToken = Object.assign(jwtSessionToken, {
    jwtSessionTokenAesKey: jwtSessionTokenAesKey,
    jwtSessionTokenElipticKey: jwtSessionTokenElipticKey,
    jwtSessionTokenRsaKeys: jwtSessionTokenRsaKeys,
  });
})();
