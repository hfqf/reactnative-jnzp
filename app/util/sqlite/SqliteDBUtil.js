import React from 'react';
import { NativeModules} from 'react-native';

import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "lcoal.db";
var database_version = "1.0";
var database_displayname = "jnzp_db";
var database_size = -1;
var instance;
const LOGINER_TABLE_NAME = 'user';//收藏表


 export  default class SqliteDBUtil  {



     static init(){
        instance = this;
        // this.dropTable();
        this.open();
    }

     static dropTable(){
         db = SQLiteStorage.openDatabase(
             database_name,
             database_version,
             database_displayname,
             database_size,
             ()=>{
                 db.transaction((tx)=> {
                     const sql =  'DROP TABLE ' +LOGINER_TABLE_NAME;
                     tx.executeSql(sql
                         , [], (tx, results)=> {
                             console.log(' sql_2'+ JSON.stringify(results))
                         }, (err)=> {
                             console.log(' sql_3'+err)
                         });
                 }, (err)=> {
                     console.log(' sql_1')

                 }, ()=> {
                     console.log(' sql_4')
                 })
             },
             (err)=>{
                 console.log(' sql_6')
             });
     }


     static open(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                db.transaction((tx)=> {
                    const sql =  'CREATE TABLE IF NOT EXISTS ' + LOGINER_TABLE_NAME + '(' +
                        'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                        'mac varchar,' +
                        'imei varchar,' +
                        'idfa varchar,' +
                        'ssid varchar,' +
                        'uuid varchar,' +
                        'islogined varchar,' +
                        'tel varchar' + ');';
                    tx.executeSql(sql
                        , [], (tx, results)=> {
                            console.log(' sql_2'+ JSON.stringify(results))
                        }, (err)=> {
                            console.log(' sql_3'+err)
                        });
                }, (err)=> {
                    console.log(' sql_1')

                }, ()=> {
                    console.log(' sql_4')
                })
            },
            (err)=>{
                console.log(' sql_6')
            });
    }



     static close(){
        if(db){
            console.log(' sql_7')
            db.close();
        }else {
            console.log(' sql_8')        }
        db = null;
    }

    /**
     * 保存当前登录用户
     */
    static saveLoginedUserInfo(mac,imei,idfa,ssid,uuid,islogined,tel) {
        return new Promise((resolve, reject) => {
            if (db) {

                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO ' + LOGINER_TABLE_NAME + ' (mac,imei,idfa,ssid,uuid,islogined,tel) VALUES(?,?,?,?,?,?,?)',  [mac, imei,idfa,ssid,uuid,islogined,tel], (tx, results) => {
                        console.log("Query completed");
                        NativeModules.SpeLoggerModule.log('8');
                        if(results){
                            NativeModules.SpeLoggerModule.log('9');
                            resolve(results);
                        }else {
                            NativeModules.SpeLoggerModule.log('10');
                            resolve('');
                        }

                    });
                });

            } else {
                reject('db not open');
            }
        });
    }

        /**
     * 查询数据库函数
     * @param  {userId} tel          tel
     * @param  {function} okCallback    查询成功回调
     */
        static getLoginedUserInfo(callback) {
            let sql = 'select * from ' + LOGINER_TABLE_NAME;

            NativeModules.SpeLoggerModule.log('12.6');

            db.transaction((tx)=>{
                tx.executeSql(sql, [],(tx,results)=>{
                    var len = results.rows.length;
                    if(len>0){
                        var u = results.rows.item(len-1);
                        return callback(null,u);
                    }else{
                        NativeModules.SpeLoggerModule.log('12.7');
                        return callback(new Error(),null);
                    }
                });
            },(error)=>{//打印异常信息
                NativeModules.SpeLoggerModule.log('12.7');

                callback(error,null)
            });
        }



};

