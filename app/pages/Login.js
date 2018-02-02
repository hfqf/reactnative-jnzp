import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
    Alert,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    DeviceEventEmitter,
    NativeModules,
    Keyboard
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,COLOR,KEYS} from '../util/config'
import DeviceUtil from  '../util/DeviceUtil'
import * as components from '../components'
import {navToRegister, navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

import SqliteDB from '../util/sqlite/SqliteDBUtil';
var  printer = require('../util/print/PrintUtil');
import DeviceInfo from 'react-native-device-info';

import { NetworkInfo } from 'react-native-network-info';

import SplashScreen from 'react-native-splash-screen'




const  MARGIN_LEFT  = 30;
const  HEIGHT_INPUT = 44;

let that;

export default class Login extends Component {

  static navigationOptions = {
      headerTitle:'登录',
      header:null
    };

  constructor(props){
    super(props);
      that = this;
    this.state = {
        account:'',
        yzcode: '',
        tycode:'',
        animating:false,
        canSendSms:true,
        second:60,
        timer:null
    }
  }


    // componentWillMount() {
    //     let result = NativeModules.SpeLoggerModule.Constant;
    //     console.log('原生端返回的常量值为：' + result);
    // }
    //
    // /**
    //  * 接收原生调用
    //  */
    // componentDidMount() {
    //
    //     DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
    //         title = "React Native界面,收到数据：" + global.patchImgNames;
    //         ToastAndroid.show("发送成功", ToastAndroid.SHORT);
    //     })
    // }
    //
    // /**
    //  * 调用原生代码
    //  */
    // skipNativeCall() {
    //     let phone = '18637070949';
    //     NativeModules.SpeLoggerModule.log(phone);
    // }
    //
    // /**
    //  * Callback 通信方式
    //  */
    // callbackComm(msg) {
    //     NativeModules.SpeLoggerModule.rnCallNativeFromCallback(msg,(result) => {
    //         ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
    //     })
    // }
    //
    // /**
    //  * Promise 通信方式
    //  */
    // promiseComm(msg) {
    //     // NativeModules.SpeLoggerModule.rnCallNativeFromPromise(msg,f).then(
    //     //     (result) =>{
    //     //         ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
    //     //     }
    //     // ).catch((error) =>{console.log(error)});
    //
    //     NativeModules.SpeLoggerModule.rnCallNativeFromPromise(msg,(result) => {
    //         ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
    //     })
    // }



    componentWillMount(){

        this.keyboardDidShowListener=Keyboard.addListener('keyboardDidShow',this._keyShow);
        this.keyboardDidHideListener=Keyboard.addListener('keyboardDidHide',this._keyHide);

    }

    componentWillUnMount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentDidMount(){



        DeviceEventEmitter.addListener('HIDE_SPLASH', e=>{

            SplashScreen.hide();

            this.setState({
                account:DeviceUtil.getMobile(),
                yzcode: DeviceUtil.getCode(),
            });
        });
    }


    _keyShow() {
        Toast("键盘显示");
    }
    _keyHide() {
        Toast("键盘隐藏");
    }

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bgStyle}
                   resizeMode="cover"
                   source={require('../resource/login/loginbg_big.png')}/>
            <ScrollView  style={styles.container2}  keyboardShouldPersistTaps={'always'}>
                <Image style={styles.logoStyle} source={require('../resource/login/login1.png')}/>

                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/login/login3.png')}/>
                    <TextInput
                        placeholderTextColor={'white'}
                        underlineColorAndroid = 'transparent'
                        ref='account'
                        style={styles.textInput}
                        onChangeText={(text) => {
                            this.setState({account:text})
                        }}
                        value={this.state.account}
                        placeholder='请填写手机号'
                        editable={!DeviceUtil.getAutoFill()}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </View>

                <View style={styles.textBgInput}>
                    <Image  style={styles.inputLeftImageStyle2} source={require('../resource/login/login3.png')}/>

                    <TextInput
                        placeholderTextColor={'white'}
                        underlineColorAndroid = 'transparent'
                        ref='code'
                        style={styles.codeInputStyle}
                        onChangeText={(text) => this.setState({yzcode:text}) }
                        placeholder='请填写验证码'
                        value={this.state.yzcode}
                        editable={!DeviceUtil.getAutoFill()}

                    />

                    <View style={{   flexDirection:'row',
                        height:HEIGHT_INPUT,
                        width:100,
                        marginLeft:MARGIN_LEFT,
                        backgroundColor:'transparent',
                        }}>
                        <Image  style={{  width:100,
                            height:HEIGHT_INPUT,
                            position: 'absolute',
                            backgroundColor: 'transparent',
                            borderRadius:HEIGHT_INPUT/2,}} source={require('../resource/login/login3.png')}/>

                        <components.Button
                            style={{
                            height:HEIGHT_INPUT,
                            width:100,
                            backgroundColor:'transparent'}}
                            disabled={this.state.canSendSms == false || DeviceUtil.getAutoFill()}
                            title= {this.state.canSendSms ? '获取' :this.state.second+'s'}
                            callback={() => this._sendVerifyBtnClicked()}>

                        </components.Button>
                        {/*<components.Button style= {this.state.canSendSms ? styles.codeBtnNormalStyle : styles.codeBtnStyle} disabled={this.state.canSendSms == false} title= {this.state.canSendSms ? '发送验证码' :this.state.second+'s'} callback={() => this._sendVerifyBtnClicked()}></components.Button>*/}
                    </View>


                </View>

                <View style={styles.textBgInput}>
                    <Image style={styles.inputLeftImageStyle} source={require('../resource/login/login4.png')}/>
                    <TextInput
                        placeholderTextColor={'white'}
                        underlineColorAndroid = 'transparent'
                        ref='pwd'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({tycode:text}) }
                        placeholder='请输入体验码'
                    />
                </View>
                <components.Button titleColor={'#9647F5'} style={{backgroundColor:'#ffffff',marginTop:15,marginRight:MARGIN_LEFT,marginLeft:MARGIN_LEFT,marginBottom:200,borderRadius:HEIGHT_INPUT/2,height:HEIGHT_INPUT}}  title='立即验证' callback={ () => this.login()} ></components.Button>
            </ScrollView>
        </View>

    );
  }

    _downCount(){
        if(this.state.canSendSms){
            this.setState({second:60});
        }else {
            this.state.second = this.state.second-1;
            if(this.state.second ==0){
                clearInterval(this.state.timer);
                this.setState({second:60,canSendSms:true,timer:null});
            }else {
                this.setState({second:this.state.second,canSendSms:false});
            }

        }

    }

  login() {

      var _this = this;

      if(this.state.account.length==0){
          Toast('手机号不能为空');
          return;
      }

      if(this.state.yzcode.length==0){
          Toast('验证码不能为空');
          return;
      }

      if(this.state.tycode.length==0){
          Toast('体验码不能为空');
          return;
      }


      this.setState({animating:true});



      HTTP.startPostPromise('http://zhengpai.jsjunqiao.com:7080/mt/api/authentication.do',
          {
              code:this.state.yzcode,
              invitation:this.state.tycode,
              mobile:this.state.account,
              mac:DeviceUtil.getMac(),
              imei:DeviceUtil.getImei(),
              idfa:DeviceUtil.getIdfa()})
          .then((data)=>{

                Toast(data.desc);
              if(parseInt(data.result) == 1){

                  let {navigation} = _this.props;
                  navigation.navigate('MyTab');

              }else {

              }

          })
          .catch(e=>{
              this.setState({animating:false});
              Toast(e);
          });

  }


    _sendVerifyBtnClicked(){

        if(this.state.account.length == 0){
            Toast('手机号不能为空');
            return;
        }

        if(!this.state.canSendSms){
            return;
        }

        this.state.canSendSms = false;
        this.state.timer=setInterval(this._downCount.bind(this),1000);

        this.setState({animating:true});


        HTTP.startPostPromise('http://zhengpai.jsjunqiao.com:7080/mt/api/sendSMS.do',
            {mobile:this.state.account,mac:DeviceUtil.getMac(),imei:DeviceUtil.getImei(),idfa:DeviceUtil.getIdfa()})
            .then((data)=>{

                Toast(data.desc);


            })
            .catch(e=>{
                this.setState({animating:false});
                Toast(e);
            });




    }

  ///各种跳转


    _onPress () {
        console.log('点击了按钮');
        let {navigation} = this.props

        navigation.navigate('Register',{
            title:'注册',
            name:'woqu'
        })
    }

    _verrifyLoginBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('VerifyCodeLogin',{
            title:'验证码登录',
        })

    }

    _forgetPwdBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('ForgetPwd',{

        })

    }


}





const styles = StyleSheet.create({
    bgStyle: {
        width:SCREEN_WIDTH+40,
        height:SCREEN_HEIGHT,
        margin:0,
        marginLeft:-20,
        marginRight:-20,
        position: 'absolute',
        backgroundColor: '#ffffff',
    },

  container: {
      flex:1,
      backgroundColor: 'transparent',
  },

    container2: {
        flex:1,
        marginBottom:-40,
        backgroundColor: 'transparent',
    },

    textBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        marginLeft:MARGIN_LEFT,
        marginTop:15,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'transparent',
        // borderColor:COLOR.theme,
        // borderWidth: 0.5,
        // borderRadius:3,
    },
    clearTextBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        marginLeft:MARGIN_LEFT,
        marginTop:30,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'transparent',
        // borderColor:COLOR.theme,
        // borderWidth: 0.5,
        // borderRadius:3,
    },
    textInput: {
        paddingLeft:10,
        paddingRight:5,
        color:'white',
        fontSize:18,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        backgroundColor:'transparent'
    }
    ,logoStyle:{
        marginTop:120,
        marginLeft:(SCREEN_WIDTH - 160)/2,
        marginRight:(SCREEN_WIDTH - 160)/2,
        height:160/5,
        width:160,
        marginBottom:30
        // borderRadius:60
    },
    inputLeftImageStyle:{
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        height:HEIGHT_INPUT,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius:HEIGHT_INPUT/2,

    },
    inputLeftImageStyle2:{
        width:SCREEN_WIDTH - 200,
        height:HEIGHT_INPUT,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius:HEIGHT_INPUT/2,

    },
    registerBtnBgStyle:{
        backgroundColor:'transparent',
        marginBottom:10,
        height:30,
        width:120,
        alignSelf:'center',

        paddingTop:10,
    },
    registerBtnStyle:{

        backgroundColor:'transparent',
        alignSelf:'center',
        // marginTop:30,
        // marginRight:5,
        // marginLeft:SCREEN_WIDTH-70,
        // height:30,
        // width:60,

    },
    codeInputStyle:{
        paddingLeft:10,
        paddingRight:5,
        color:'white',
        fontSize:18,
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH-200,
        backgroundColor:'transparent'
    },

    codeBtnNormalStyle:{
        marginTop:5,
        marginBottom:5,
        marginLeft:20,
        height:30,
        flex:1,
        backgroundColor:COLOR.theme,
        borderRadius:10,

    },

    codeBtnStyle:{
        marginTop:5,
        marginBottom:5,
        marginLeft:20,
        height:30,
        flex:1,
        backgroundColor:'#676767',
        borderRadius:10,

    },

    codeBtnBgStyle:{
        backgroundColor:'transparent',
        marginBottom:0,
        height:40,
        width:120,
        alignSelf:'center',
        textAlignVertical:'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },



});
