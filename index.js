import React, { Component } from 'react';
import { AppRegistry, NativeModules, NativeAppEventEmitter,AsyncStorage,DeviceEventEmitter} from 'react-native';

import {AppNavigator,AppNavigator2} from './app/Navigation';

var Oc2RnManager = NativeModules.Oc2RnManager
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

import  IMEI  from 'react-native-imei';


import {SCREEN_WIDTH,SYSTEM,COLOR,KEYS,HTTP} from './app/util/config'

import Device from  './app/util/DeviceUtil';

import SqliteDB from './app/util/sqlite/SqliteDBUtil';



let that;
export default class CoreApp extends Component {

    constructor(props){
        super(props);
        that = this;
        SqliteDB.init();
        NativeModules.SpeLoggerModule.log('1');
        this.state = {
            isneedlogin: false,
        }
        NativeModules.SpeLoggerModule.log('2');
        this.initSetting();
    }

    initSetting(){
        NativeModules.SpeLoggerModule.log('3');
        NativeModules.SpeLoggerModule.log('4');


        if(SYSTEM.Android){
            NativeModules.SpeLoggerModule.log('5');
            let _imei =   IMEI.getImei();
            console.log('_getIMEI _imei'+_imei);
            Device.setImei(_imei);
            NativeModules.SpeLoggerModule.log('6');

            DeviceInfo.getMACAddress().then((e)=>{
                NativeModules.SpeLoggerModule.log('7');
                console.log('getMACAddress'+e);
                Device.setMac(e);

                SqliteDB.saveLoginedUserInfo(e,_imei,'','','','','');

                that._checkDevice4Android(e,_imei);

            });

        }else {
            Oc2RnManager.getDeviceInfos().then(v=>{

                console.log('getDeviceInfos'+ JSON.stringify(v));

                Device.setIdfa(v.idfa);

                SqliteDB.saveLoginedUserInfo('','',v.idfa,'','','','');


                that._checkDevice4IOS(v.idfa);


            }).catch(e=>{


            });
        }

    }

    componentDidMount(){

    }
    componentWillMount(){



    }

    _checkDevice4Android(mac,imei){
                    HTTP.startPostPromise('http://zhengpai.jsjunqiao.com:7080/mt/api/authenticationState.do',
                        {mac:mac,imei:imei,idfa:''})
                        .then((data)=>{

                            NativeModules.SpeLoggerModule.log('q15');
                            console.log('_checkDevice'+JSON.stringify(data));
                            if(parseInt(data.result) == 1){

                                that.setState({isneedlogin:false},function () {
                                    NativeModules.SpeLoggerModule.log('16');
                                    DeviceEventEmitter.emit('HIDE_SPLASH','0');

                                    DeviceEventEmitter.emit('RELOAD_TAB','tab1');

                                });

                            }else {

                                const _data = data.data;
                                if(_data.code != null && _data.mobile != null){
                                    if(_data.code.length > 0 && _data.mobile.length >0){
                                        Device.setCode(_data.code);
                                        Device.setMobile(_data.mobile);
                                        Device.setIsAutoFlll(true);
                                    }
                                }

                                NativeModules.SpeLoggerModule.log('17');
                                that.setState({isneedlogin:true},function () {
                                    NativeModules.SpeLoggerModule.log('18');
                                    DeviceEventEmitter.emit('HIDE_SPLASH','1');
                                });
                            }

    })
    }

    _checkDevice4IOS(idfa){
        HTTP.startPostPromise('http://zhengpai.jsjunqiao.com:7080/mt/api/authenticationState.do',
            {mac:'',imei:'',idfa:idfa})
            .then((data)=>{

                NativeModules.SpeLoggerModule.log('q15');
                console.log('_checkDevice'+JSON.stringify(data));
                if(parseInt(data.result) == 1){

                    that.setState({isneedlogin:false},function () {
                        NativeModules.SpeLoggerModule.log('16');
                        DeviceEventEmitter.emit('RELOAD_TAB','tab1');
                        DeviceEventEmitter.emit('HIDE_SPLASH','0');
                    });

                }else {

                    const _data = data.data;
                    if(_data.code != null && _data.mobile != null){
                        if(_data.code.length > 0 && _data.mobile.length >0){
                            Device.setCode(_data.code);
                            Device.setMobile(_data.mobile);
                            Device.setIsAutoFlll(true);
                        }
                    }

                    NativeModules.SpeLoggerModule.log('17');
                    that.setState({isneedlogin:true},function () {
                        NativeModules.SpeLoggerModule.log('18');
                        DeviceEventEmitter.emit('HIDE_SPLASH','1');
                    });
                }

            })
    }



    _autoJumpToMain(){
        let {navigation} = that.props;
        navigation.navigate('MyTab');
    }

    render() {
    return this.state.isneedlogin ?
        (
      <AppNavigator
          onNavigationStateChange={(prevState, currentState,event) => {
              const getCurrentRouteName = (navigationState) => {
                  if (!navigationState) return null;
                  const route = navigationState.routes[navigationState.index];
                  if (route.routes) return getCurrentRouteName(route);
                  return route.routeName;
              };
              let currentRoute = getCurrentRouteName(currentState);
              const prevScreen = getCurrentRouteName(prevState);
              console.log('onNavigationStateChange'+currentRoute+prevScreen+JSON.stringify(event));

              if(currentRoute != prevScreen &&event.params == undefined ) {
                  DeviceEventEmitter.emit('RELOAD_TAB',currentRoute);
              }
          }}

      />
    ):   (
            <AppNavigator2
                onNavigationStateChange={(prevState, currentState,event) => {
                    const getCurrentRouteName = (navigationState) => {
                        if (!navigationState) return null;
                        const route = navigationState.routes[navigationState.index];
                        if (route.routes) return getCurrentRouteName(route);
                        return route.routeName;
                    };
                    let currentRoute = getCurrentRouteName(currentState);
                    const prevScreen = getCurrentRouteName(prevState);
                    console.log('onNavigationStateChange'+currentRoute+prevScreen+JSON.stringify(event));

                    if(currentRoute != prevScreen &&event.params == undefined ) {
                        DeviceEventEmitter.emit('RELOAD_TAB',currentRoute);
                    }
                }}

            />
        )
  }
}


AppRegistry.registerComponent('CoreApp', () => CoreApp);
