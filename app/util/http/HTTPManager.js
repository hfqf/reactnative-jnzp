import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
} from 'react-native';

import CryptoUtil from "../crypto/CryptoUtil";
var  printer = require('../print/PrintUtil');


import LoginUserUtl from "../LoginUserUtl";
let UserInfo = new LoginUserUtl();

let DEBUG_MODE = 1; //1是真机，0是模拟器
let Url = DEBUG_MODE ? 'http://192.168.30.15:18080': 'http://localhost:18080';


let LoginUrl         = Url + '/users/login3';
let GetContactsUrl   = Url + '/contact/queryAll';
let GetContactsUrl2   = Url + '/contact/queryAll5';


export default class HTTPManager {


    static URL(){
        return Url;
    }

 //普通callback方式post
  static postRequest(url, bodyDict, callback){

    var bodyStr = '';
    for (var key in bodyDict) {
      if (bodyDict.hasOwnProperty(key)) {
        console.log('key = ' + key + ', value = ' + bodyDict[key]);
        bodyStr = bodyStr + key + '=' + bodyDict[key] + '&';
      }
    }
    var myRequest = new Request(url,
                                {
                                  method: 'POST',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                  },
                                  body: bodyStr
                                });

    fetch(myRequest)
    .then((response) => response.json())
    .then((responseData) => callback(null,responseData))
    .catch((error) => callback(error,null));
  }


//promise方式post
    static postRequestPromise(url, bodyDict){

        var bodyStr = '';
        for (var key in bodyDict) {
            if (bodyDict.hasOwnProperty(key)) {
                console.log('key = ' + key + ', value = ' + bodyDict[key]);
                bodyStr = bodyStr + key + '=' + bodyDict[key] + '&';
            }
        }
        return new Promise((resolve, reject) => {
            var myRequest = new Request(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: bodyStr
                });

            fetch(myRequest)
                .then((response) => response.json())
                .then((responseData) => {

                    console.log('postRequestPromise:post'+url+'succeed'+printer.obj2string(responseData.ret));
                    if(parseInt(responseData.code) == 1){
                        resolve(responseData.ret);
                    }else if(parseInt(responseData.result) == 1){
                        resolve(responseData.data,responseData.desc);
                    }
                    else {
                        reject(responseData.msg);
                    }

                })
                .catch((error) => {
                    console.log('postRequestPromise:post'+url+'fail'+error);
                    reject(error);

                });
        });


    }

    //promise方式post
    static postRequestPromise2(url, bodyDict){

        var bodyStr = '';
        for (var key in bodyDict) {
            if (bodyDict.hasOwnProperty(key)) {
                console.log('key = ' + key + ', value = ' + bodyDict[key]);
                bodyStr = bodyStr + key + '=' + bodyDict[key] + '&';
            }
        }

        console.log('postRequestPromise:post'+url+'body'+ JSON.stringify(bodyDict));

        return new Promise((resolve, reject) => {
            var myRequest = new Request(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: bodyStr
                });

            fetch(myRequest)
                .then((response) => response.json())
                .then((responseData) => {
                    const  rep = responseData;

                    console.log('postRequestPromise:post'+url+'succeed'+ JSON.stringify(rep));

                         if(rep.data == ''){
                             rep.data ={};
                         }

                    // if(rep.data.code == '' || rep.data.code == null ){
                    //     rep.data ={code:'6666',mobile:'18251846048'};
                    // }
                        resolve(rep);
                })
                .catch((error) => {
                    console.log('postRequestPromise:post'+url+'fail'+error);
                    reject(error);

                });
        });


    }


  /* 上传文件
    url: 完整地址
    file: 要上传的文件
  */
  static uploadFile(url, fileUri, bodyDict, successCallback, failCallback){

    var file = {uri: fileUri, type: 'multipart/form-data', name: "a.png"};

    var data = new FormData();
    data.append('file', file);

    for (var key in bodyDict) {
      if (bodyDict.hasOwnProperty(key)) {
        console.log('key = ' + key + ', value = ' + bodyDict[key]);
        data.append(key, bodyDict[key]);
      }
    }

    var myRequest = new Request(url,
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type':'multipart/form-data'
                                  },
                                  body: data
                                });

    fetch(myRequest)
    .then((response) => response.json())
    .then((responseData) => successCallback(responseData))
    .catch((error) => failCallback(error));

  }

  /* 参数签名: 参数字典按字母排序，追加RRT_SECRET_KEY，再MD5加密 */
  static getSigCode(parmaDict){
    var keys = [];
    var values = [];
    for (var key in parmaDict) {
      if (parmaDict.hasOwnProperty(key)) {
          keys.push(key);
      }
    }
    keys.sort(function(m,n){
      if (m>n) {
        return 1;
      }else{
        return -1;
      }
    });

    var str = '';
    for (var key in keys) {
      if (keys.hasOwnProperty(key)) {
        str = str + keys[key] + '=' + parmaDict[keys[key]];
      }
    }
    str = str + RRT_SECRET_KEY;
    let sigCode = CryptoUtil.encodeMD5(str);
    return sigCode;
  }



//----------------------------以上为公用方法, 以下为接口方法----------------------------------

  /* 登录接口 */
  static async login(userName, password, callback){
    // password = CryptoUtil.encodeMD5(password);
    let dataDict = {
      "username":userName,
      "pwd":password,
      "udid":'',
      "ostype":"ios",
      "version":'3.4.6',
      "pushid":'',
      "isfirstlogin":"0",
    };

    this.postRequest(LoginUrl, dataDict, callback);
  }

    /* 登录接口 */
    static async getContacts(tel){
        // password = CryptoUtil.encodeMD5(password);
        let dataDict = {
            "owner":tel,
        };
        return await this.postRequestPromise(GetContactsUrl, dataDict);
    }

    static async getContacts2(tel,index){
        // password = CryptoUtil.encodeMD5(password);
        let dataDict = {
            "owner":tel,
            "index":index
        };
        return await this.postRequestPromise(GetContactsUrl2, dataDict);
    }

    /*
    通用post
     */
    static async startPostPromise(url,body){
        return await this.postRequestPromise2(url, body);
    }


  // // 上传头像接口
  // static async updateHeadImage(fileUri, successCallback, failCallback){
  //   let url = BaseUrl + '/api/v3/client/account.updateHeadImage';
  //   var dataDict = {
  //     "v":"3.0",
  //     "access_token":UserInfo.m_accessToken
  //   };
  //   let sigCode = this.getSigCode(dataDict);
  //   dataDict['sig'] = sigCode + '';
  //
  //   this.uploadFile(url, fileUri, dataDict, successCallback, failCallback);
  // }
  //
  // // 修改密码接口
  // static async modifyPassword(oldPwd, newPwd, confirmPwd, successCallback, failCallback){
  //   let url = IMUrl + '/etspace/mine/updateselfpassword';
  //
  //   oldPwd = CryptoUtil.encodeMD5(oldPwd).toString().toLowerCase();
  //   newPwd = CryptoUtil.encodeMD5(newPwd).toString().toLowerCase();
  //   confirmPwd = CryptoUtil.encodeMD5(confirmPwd).toString().toLowerCase();
  //
  //   var date = new Date();
  //   date = date.getTime();
  //
  //   // 随机数
  //   var Max = 999999;
  //   var Min = 100000;
  //   var range = Max - Min;
  //   var Rand = Math.random();
  //   var random = Min + Math.round(Rand * range);
  //
  //   var pwdStr = oldPwd + ',' + newPwd + ',' + confirmPwd + ',' + date + ',' + random;
  //   pwdStr = CryptoUtil.encodeDES(pwdStr);
  //
  //   var dataDict = {
  //     "updatePwdForm": pwdStr,
  //     "access_token":UserInfo.m_accessToken
  //   };
  //   this.postRequest(url,dataDict,successCallback, failCallback);
  // }



}
