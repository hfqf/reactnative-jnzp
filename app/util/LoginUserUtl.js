import SQLiteManager from './sqlite/SqliteDBUtil';

let BaseUrl = 'http://112.35.4.42:9006';

let instance = null;

export default class UserInfoManager {
  //单例对象
  constructor(){
    if(!instance){
      instance = this;
    }
    return instance;
  }





}
