let gKey = '';
let gIv = '';
// 随机6位数
let randomCount = 1000000;

var CryptoJS = require("crypto-js");
var dateFormat = require('dateformat');

export default class CryptoUtil {

  static tokenDES(text){
    // 时间格式
    var time = new Date();
    var format = dateFormat(time, 'yyyymmddHHMMss');
    // 随机randomCount位数
    let random = Math.round(Math.random() * randomCount);
    // 逗号拼接
    let encodeStr = text + ',' + format + ',' + random;
    let result = this.encodeDES(encodeStr);
    return result;
  }

  /* DES 加密 */
  //CBC 加密模式
  static encodeDES(text){
    var keyHex = CryptoJS.enc.Utf8.parse(gKey);
    var ivHex = CryptoJS.enc.Utf8.parse(gIv);
    var encrypted = CryptoJS.TripleDES.encrypt(text, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  //CBC 解密模式
  static decodeDES(text){
    var keyHex = CryptoJS.enc.Utf8.parse(gKey);
    var ivHex = CryptoJS.enc.Utf8.parse(gIv);
    var decrypted = CryptoJS.TripleDES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(text)
    }, keyHex, {
          iv:ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /* MD5 */
  static encodeMD5(text){
    return CryptoJS.MD5(text);
  }

}
