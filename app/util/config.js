import { Dimensions,Platform,NativeModules} from  'react-native';
import DeviceInfo from 'react-native-device-info';

import Device from  './DeviceUtil'
import HTTPManager from './http/HTTPManager';

export const DEBUG = __DEV__ ;  //开发环境
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const  VERSION = '1.1.0';

let { width,height } = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const STATUS_BAR_HEIGHT = 20;
export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 50;

export let HTTP_SCHEME = 'http';
export let HTTPS_SCHEME = 'https';

export const SYSTEM = {
  iOS : Platform.OS === 'ios',
  Android : Platform.OS === 'android',
}

export  const  RN_HASFIX = '&isRN=1';

export  const  RN_HASFIX2 = 'isRN=1';

export  const  HTTP = HTTPManager;

export const COLOR = {
  theme: '#3da0ff',
  favored: '#C71A22',
  textPrompt: '#929292',
  textNormal: '#5E5E5E',
  textEmpha: '#212121',
  textLightPrompt: '#EBEBEB',
  textLightNormal: '#FFFFFF',
  backgroundDarker: '#D6D6D6',
  backgroundNormal: '#EBEBEB',
  backgroundLighter: '#FFFFFF',
  backgroundDarkLighter: '#424242',
  backgroundDarkNormal: '#000000',
  backgroundNotice: '#FFFB00',
  linePrompt: '#EBEBEB',
  lineNormal: '#A9A9A9',
  lineEmpha: '#929292'
}

export const KEYS = {
    ISKOGINED:'ISKOGINED',
    NAME:'NAME',
    TOKEN:'TOKEN',
    HEADURL:'HEADURL',
    USERID:'USERID',
    SSID:'SSID',
    MAC:'MAC',
    IDFA:'IDFA',
    IMEI:'IMEI'
}

export  const URLS = {

    about:'https://allison.jsjunqiao.com:6443/mt/allison/about.do?'+RN_HASFIX2,
    product:'https://allison.jsjunqiao.com:6443/mt/allison/product.do?'+RN_HASFIX2,
    calculator:'https://allison.jsjunqiao.com:6443/mt/allison/calculator.do?'+RN_HASFIX2,
    server:'https://allison.jsjunqiao.com:6443/mt/allison/server.do?'+RN_HASFIX2,
    collect:'https://allison.jsjunqiao.com:6443/mt/allison/collect.do?'+RN_HASFIX2,
    feedback:'https://allison.jsjunqiao.com:6443/mt/allison/feedback.do?'+RN_HASFIX2,
    addFeedback:'https://allison.jsjunqiao.com:6443/mt/allison/addFeedback.do?'+RN_HASFIX2,
    userInfo:'https://allison.jsjunqiao.com:6443/mt/allison/userInfo.do?'+RN_HASFIX2,
    tidings:'https://allison.jsjunqiao.com:6443/mt/allison/tidings.do?'+RN_HASFIX2,

}


export  const JNZP_URLS = {
    params:'mac='+Device.getMac()+'&imei='+Device.getImei()+'&idfa='+Device.getIdfa(),
    home:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/index.do?',
    takedata:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/data.do?',
    analysis:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/analysis.do?',
    advpush:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/delivery.do?',
}






export let  DeviceUtil  =  Device;

