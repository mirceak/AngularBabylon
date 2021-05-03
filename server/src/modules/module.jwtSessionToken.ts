import { readFileSync, writeFileSync } from "fs";
import * as _jwt from "jsonwebtoken";
import path = require("path");
import _Cryptography from "./module.cryptography";
const webcrypto = require("crypto").webcrypto;
export var jwtSessionToken: any = {};
export var Cryptography: _Cryptography = new _Cryptography(webcrypto);
export var jwt = _jwt;
export var getRandomValues = webcrypto.getRandomValues;
(async () => {
  var jwtSessionTokenAesKey;
  var jwtSessionTokenElipticKey;
  var jwtSessionTokenRsaKeys;
  var jwtSessionTokenLock;
  var generateLock = async () => {
    jwtSessionTokenLock = await Cryptography.makeCipherPieces(1000);
    jwtSessionTokenLock.password = [...Array(1000)]
      .map((i) => (~~(Math.random() * 2 ** 36)).toString(36))
      .join("");
    writeFileSync(
      path.join(
        __dirname,
        "../../..//src/certs/jwtSessionToken/jwtSessionTokenLock.json"
      ),
      JSON.stringify(jwtSessionTokenLock)
    );
  };
  try {
    jwtSessionTokenLock = readFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenLock.json"
      ), 
      "utf-8"
    );
  } catch (error) {}
  if (!jwtSessionTokenLock || !jwtSessionTokenLock.length) {
    await generateLock();
  }
  jwtSessionTokenLock = readFileSync(
    path.join(
      __dirname,
      "../../../src/certs/jwtSessionToken/jwtSessionTokenLock.json"
    ),
    "utf-8"
  );;
  jwtSessionTokenLock = JSON.parse(jwtSessionTokenLock);

  var generateAesKey = async () => {
    jwtSessionTokenAesKey = await Cryptography.generateAesKey();
    writeFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenAesKey.json"
      ),
      Buffer.from(new TextEncoder().encode(jwtSessionTokenAesKey.pubkData))
    );
  };
  try {
    jwtSessionTokenAesKey = readFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenAesKey.json"
      ),
      "utf-8"
    );
  } catch (error) {}
  if (!jwtSessionTokenAesKey || !jwtSessionTokenAesKey.length) {
    await generateAesKey();
  }
  jwtSessionTokenAesKey = readFileSync(
    path.join(
      __dirname,
      "../../../src/certs/jwtSessionToken/jwtSessionTokenAesKey.json"
    ),
    "utf-8"
  );
  jwtSessionTokenAesKey = await Cryptography.importAesKey(
    jwtSessionTokenAesKey
  );

  var generateElipticKey = async () => {
    jwtSessionTokenElipticKey = await Cryptography.generateElipticKey();
    writeFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenElipticKey.json"
      ),
      Buffer.from(new TextEncoder().encode(jwtSessionTokenElipticKey.privkData))
    );
  };
  try {
    jwtSessionTokenElipticKey = readFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenElipticKey.json"
      ),
      "utf-8"
    );
  } catch (error) {}
  if (!jwtSessionTokenElipticKey || !jwtSessionTokenElipticKey.length) {
    await generateElipticKey();
  }
  jwtSessionTokenElipticKey = readFileSync(
    path.join(
      __dirname,
      "../../../src/certs/jwtSessionToken/jwtSessionTokenElipticKey.json"
    ),
    "utf-8"
  );
  jwtSessionTokenElipticKey = await Cryptography.importElipticKey(
    jwtSessionTokenElipticKey
  );

  var generateRsaKey = async () => {
    jwtSessionTokenRsaKeys = await Cryptography.generateRsaKeys("jwk");
    writeFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json"
      ),
      Buffer.from(
        new TextEncoder().encode(
          JSON.stringify({
            privkData: jwtSessionTokenRsaKeys.privkData,
            pubkData: jwtSessionTokenRsaKeys.pubkData,
          })
        )
      )
    );
  };
  try {
    jwtSessionTokenRsaKeys = readFileSync(
      path.join(
        __dirname,
        "../../../src/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json"
      ),
      "utf-8"
    );
  } catch (error) {}
  if (!jwtSessionTokenRsaKeys || !jwtSessionTokenRsaKeys.length) {
    await generateRsaKey();
  }
  jwtSessionTokenRsaKeys = readFileSync(
    path.join(
      __dirname,
      "../../../src/certs/jwtSessionToken/jwtSessionTokenRsaKeys.json"
    ),
    "utf-8"
  );
  jwtSessionTokenRsaKeys = JSON.parse(jwtSessionTokenRsaKeys);
  jwtSessionTokenRsaKeys.publicKey = await Cryptography.importRsaKey(
    jwtSessionTokenRsaKeys.pubkData,
    true
  );
  jwtSessionTokenRsaKeys.privateKey = await Cryptography.importRsaKey(
    jwtSessionTokenRsaKeys.privkData
  );

  Object.assign(jwtSessionToken, {
    jwtSessionTokenAesKey: jwtSessionTokenAesKey,
    jwtSessionTokenElipticKey: jwtSessionTokenElipticKey,
    jwtSessionTokenRsaKeys: jwtSessionTokenRsaKeys,
    jwtSessionTokenLock: jwtSessionTokenLock,
  });
})();
