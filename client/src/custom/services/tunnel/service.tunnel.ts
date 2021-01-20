import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import tunnel from '../../../tunnel';
import SEAL from 'node-seal'
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ServiceTunnel {
  private socket;
  private p1;
  private p2;
  private p3;
  private ph2;
  private ph3;
  private subtle = window.crypto.subtle;
  private getRandomValues = window.crypto.getRandomValues;
  private publicExponent = new Uint8Array([1, 0, 1]);
  private td = new TextDecoder();
  private te = new TextEncoder();

  constructor(private http: HttpClient) {}
  async getHash(input) {
    var buffer = new TextEncoder().encode(input);
    var hash_buffer = await this.subtle.digest('SHA-512', buffer);
    let hash_array = Array.from(new Uint32Array(hash_buffer));
    let hash_hex_str = hash_array
      .map((byte) => ('00' + byte.toString(32)).slice(-2))
      .join('');
    return hash_hex_str;
  }

  // async connect(postData) {
  //   this.p2 = postData.username;
  //   this.p3 = postData.password;

  //   this.p1 = postData.email;
  //   this.ph2 = await this.getHash(this.p2);
  
  //   this.socket = socketIO.io('http://localhost:3030');

  //   this.socket.on('connect', () => {
  //     console.log('connected to tunnel socket:', this.socket.id);
  //   });
  //   this.socket.on('injectCodeInClient', (data) => {
  //     //do checks for code and emit random calls
  //     this.socket.emit('injectCodeInServer', 'tst');
  //   });
  //   //initiate the session by requesting code for the account of @email
  //   this.socket.emit('startSession', { email: this.p1 });
  // }

  async tunnel(data) {

    (async ()=>{
      const seal = await SEAL()
      const schemeType = seal.SchemeType.bfv;
      const securityLevel = seal.SecurityLevel.tc128;
      const polyModulusDegree = 4096;
      const bitSizes = [36, 36, 37];
      const bitSize = 20;
      const parms = seal.EncryptionParameters(schemeType);
      // Set the PolyModulusDegree
      parms.setPolyModulusDegree(polyModulusDegree);
      // Create a suitable set of CoeffModulus primes
      parms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
      // Set the PlainModulus to a prime of bitSize 20.
      parms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));
      const context = seal.Context(
        parms, // Encryption Parameters
        true, // ExpandModChain
        securityLevel // Enforce a security level
      );
      if (!context.parametersSet()) {
        throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.');
      }
      const encoder: any = seal.BatchEncoder(context);
      const keyGenerator = seal.KeyGenerator(context);
      const publicKey = keyGenerator.createPublicKey();
      const secretKey = keyGenerator.secretKey();
      const encryptor = seal.Encryptor(context, publicKey);
      const decryptor = seal.Decryptor(context, secretKey);
      const evaluator = seal.Evaluator(context);
      // Create data to be encrypted
      const array = Int32Array.from([1, 2, 3, 4, 5]);
      // Encode the Array
      const plainText: any = encoder.encode(array);
      const array1 = Int32Array.from([1]);
      // Encode the Array
      const plainText1: any = encoder.encode(array1);
      // console.log(encoder.decode(plainText));
      // Encrypt the PlainText
      const cipherText: any = encryptor.encrypt(plainText);
      // console.log(cipherText.save());
      // Add the CipherText to itself and store it in the destination parameter (itself)
      evaluator.addPlain(cipherText, plainText1, cipherText); // Op (A), Op (B), Op (Dest)
      // Or create return a new cipher with the result (omitting destination parameter)
      // const cipher2x = evaluator.add(cipherText, cipherText)
      // Decrypt the CipherText
      const decryptedPlainText = decryptor.decrypt(cipherText);
      // Decode the PlainText
      const decodedArray = encoder.decode(decryptedPlainText);
      console.log('decodedArray', decodedArray);
    
    })()

    var keys = await this.generateRsaKeys();
    var pubkData = await this.subtle.exportKey('jwk', keys.publicKey);

    data.pubkData = pubkData;

    this.http.post<any>('/utils/tunnel', data).subscribe(async (response) => {
      var lock = response.lock;
      var offset = 64;
      // var decr = await this.decrypt(this.toArrayBuffer(response.encrypted), keys.privateKey, 'test')
      var str = tunnel.unlockMessage(
        tunnel
          .unlockMessage(tunnel.unlock(lock.lock, data.email), lock.dataLock)
          .substring(offset, lock.lock.length - offset),
        lock.dataLock
      );
      var key: any = await this.decrypt(
        this.toArrayBuffer(str.split(',')),
        keys.privateKey,
        'test'
      );
      key = await this.importRsaKey(JSON.parse(key));

      var newKeys = await this.generateRsaKeys();
      var newPubkData = await this.subtle.exportKey('jwk', newKeys.publicKey);

      var encrypted = await this.encrypt('testing something cooweltesting something cooweltesting something coowel', key);
      var lock = null; //await tunnel.makeLock(data.email, new Uint16Array(encrypted.ciphertext).join(','));
      var postData = {
        lock: lock,
        email: data.email,
        newPubkData: encrypted,
      };
      this.http.post<any>('/utils/onLock', postData).subscribe(async (response) => {
        console.log(response)
      })
    });
  }

  async importRsaKey(keyData, format = 'jwk', hash = 'SHA-512') {
    const key = await this.subtle.importKey(
      format,
      keyData,
      {
        name: 'RSA-OAEP',
        hash,
      },
      true,
      ['encrypt']
    );

    return key;
  }

  toArrayBuffer(arr) {
    var buf = new ArrayBuffer(arr.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = arr.length; i < strLen; i++) {
      bufView[i] = arr[i];
    }
    return buf;
  }

  async encrypt(plaintext, key) {
    const iv: any = 'test';

    const ciphertext = await this.subtle.encrypt(
      {
        name: 'RSA-OAEP',
        iv,
      },
      key,
      this.te.encode(plaintext)
    );

    return {
      iv,
      ciphertext,
    };
  }

  async decrypt(ciphertext, key, iv) {
    const plaintext = await this.subtle.decrypt(
      {
        name: 'RSA-OAEP',
        iv,
      },
      key,
      ciphertext
    );

    return this.td.decode(plaintext);
  }

  async generateRsaKeys() {
    const { publicKey, privateKey } = await this.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4480,
        publicExponent: this.publicExponent,
        hash: {
          name: 'SHA-512',
        },
      },
      true,
      ['encrypt', 'decrypt']
    );

    return { publicKey, privateKey };
  }
}
