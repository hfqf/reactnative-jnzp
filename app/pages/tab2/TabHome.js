import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    TextInput,
    WebView,
    Alert,
    AsyncStorage,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KEYS,DeviceUtil,JNZP_URLS} from '../../util/config';
import * as components from '../../components/index'
import SqliteDB from '../../util/sqlite/SqliteDBUtil';
import DeviceInfo from 'react-native-device-info';

import SplashScreen from 'react-native-splash-screen'


const WEBVIEW_REF = 'webview';

let that;

export default class TabHome extends Component {

    constructor(props){
        super(props);
        that = this;

        const _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
        console.log('TabHome constructor'+JNZP_URLS.home+_url);

        this.state = {
            baseUrl:JNZP_URLS.home,
            url: JNZP_URLS.home+_url,
            isShowLeftBtn:false,
            leftBtnTitle:'',
            leftBtnJS:'',
            headerTitle:'',
            isShowRightBtn:false,
            rightBtnTitle:'',
            rightBtnJS:'',
            ssid:''
        }

    }


    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
        // headerTitle:`${navigation.state.params.headerTitle}`,
        // headerLeft:(
        //     <Text  onPress={()=>{
        //         that.leftItemBtnClicked();
        //     }} style={{marginLeft:5, width:80, textAlign:"center"}} >
        //         {navigation.state.params.leftBtnTitle}
        //     </Text>
        // ),
        // headerRight:(
        //     <Text  onPress={()=>{
        //         that.rightItemBtnClicked();
        //     }} style={{marginLeft:5, width:80, textAlign:"center"}} >
        //         {navigation.state.params.rightBtnTitle}
        //     </Text>
        // )
    });


    componentWillUnmount(){
        DeviceEventEmitter.removeAllListeners();
    };


    componentDidMount(){

         DeviceEventEmitter.addListener('RELOAD_TAB', e=>{

             console.log(' DeviceEventEmitter.addListener'+e);
             if(e ==  'tab1'){

                 const _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
                 console.log('TabHome constructor reload'+JNZP_URLS.home+_url);

                 this.setState({
                     url: JNZP_URLS.home+_url,
                 })


                 that.reload();




             }

         });


        NativeModules.SpeLoggerModule.log('19');
        DeviceEventEmitter.addListener('HIDE_SPLASH', e=>{

            NativeModules.SpeLoggerModule.log('20');
                NativeModules.SpeLoggerModule.log('21');
                SplashScreen.hide();


        });

        AsyncStorage.getItem(KEYS.SSID)
            .then((e) => {

                that.setState({
                    ssid:e,});

                });

    }

    _setOnesState= (_arr,callback) => {

        let   _isShowLeftBtn = false
        let   _leftBtnTitle  = '1'
        let   _leftleftBtnJS = ''
        let   _isShowRightBtn = false
        let   _rightBtnTitle = '3'
        let   _rightBtnJS = ''
        let   _headerTitle=''
        for(let i=0 ;i<_arr.length;i++){
            const  info = _arr[i];
            if(info.menuType == 'left'){
                _isShowLeftBtn=true
                _leftBtnTitle=info.menuName
                _leftleftBtnJS=info.menuEvent

            }else if(info.menuType == 'right'){
                _isShowRightBtn=true
                _rightBtnTitle=info.menuName
                _rightBtnJS=info.menuEvent
            }else if(info.menuType == 'center') {
                _headerTitle=info.menuName
            }
        }

        that.setState({
                isShowLeftBtn:_isShowLeftBtn,
                leftBtnTitle:_leftBtnTitle,
                leftBtnJS:_leftleftBtnJS,
                isShowRightBtn:_isShowRightBtn,
                rightBtnTitle:_rightBtnTitle,
                rightBtnJS:_rightBtnJS,
                headerTitle:_headerTitle,
            },function () {
                callback();
            }
        );

    }

    onMessage = e => {

        const _msg =  e.nativeEvent.data;
        // if(_msg == 'ssid'){
        //
        //
        //     console.log('ssid->'+that.state.ssid);
        //     let body =  {getSsid:that.state.ssid};
        //     console.log('post body->'+JSON.stringify(body));
        //     this.refs[WEBVIEW_REF].postMessage(JSON.stringify(body));
        // }


    }

    render() {

        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
        };

        const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';


        return (

            <View style={styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-20,backgroundColor:'gray'}}
                    source={{uri:this.state.url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    onMessage={this.onMessage.bind(this)}
                    injectedJavaScript={patchPostMessageJsCode}
                />
            </View>
        );

    }



    goBack = () => {
        that.refs[WEBVIEW_REF].goBack();
    };

    goForward = () => {
        that.refs[WEBVIEW_REF].goForward();
    };

    reload = () => {
        that.refs[WEBVIEW_REF].reload();
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
