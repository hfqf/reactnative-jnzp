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
    ActivityIndicator
} from 'react-native';

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config'
import * as components from '../components'
import {navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

import SqliteDB from '../util/sqlite/SqliteDBUtil';
import DeviceInfo from 'react-native-device-info';


export default class Register extends Component {

  static navigationOptions = {
       headerTitle:'注册',
       gesturesEnabled:true
    };

    constructor(props){
        super(props);
        SqliteDB.init();
        this.state = {
            nickname:'',
            code:'',
            account:'',
            password:'',
            animating:false,
            canSendSms:true,
            second:60,
            timer:null
        }
    }

    _onPress () {
        console.log('点击了按钮');
    }

    render() {
        return (
            <ScrollView  style={styles.container}>
                <Image style={styles.logoStyle} source={require('../resource/images/logo.png')}/>
                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/images/logo.png')}/>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='nickname'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({nickname:text}) }
                        placeholder='请输入昵称'
                    />

                </View>
                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/images/logo.png')}/>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='account'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({account:text}) }
                        placeholder='请输入手机号'
                    />

                </View>
                <View style={styles.clearTextBgInput}>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='code'
                        style={styles.codeInputStyle}
                        onChangeText={(text) => this.setState({code:text}) }
                        placeholder='请输入验证码'
                    />
                    <components.Button style= {this.state.canSendSms ? styles.codeBtnNormalStyle : styles.codeBtnStyle} disabled={this.state.canSendSms == false} title= {this.state.canSendSms ? '发送验证码' :this.state.second+'s'} callback={() => this._sendVerifyBtnClicked()}></components.Button>

                </View>
                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/images/logo.png')}/>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='pwd'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({password:text}) }
                        placeholder='请输入密码'
                    />

                </View>

                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="large" />

                <components.Button style={{backgroundColor:'#3da0ff'}}  title='注册' callback={ () => this._registerBtnClicked()} ></components.Button>

                <TouchableOpacity  style={styles.registerBtnBgStyle}  onPress={()=>this._pop()} activeOpacity={1}>
                    <Text style={styles.registerBtnStyle}>
                        已有账号登录
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    _registerBtnClicked() {
        var _this = this;
        if(this.state.nickname.length==0){
            Toast('昵称不能为空');
            return;
        }

        if(this.state.account.length==0){
            Toast('账号不能为空');
            return;
        }

        if(this.state.code.length==0){
            Toast('验证码不能为空');
            return;
        }

        if(this.state.password.length==0){
            Toast('密码不能为空');
            return;
        }

        this.setState({animating:true});

        const body ={
            deviceId:DeviceInfo.getUniqueID(),
            source:SYSTEM.iOS?'1':'2',
            account:_this.state.nickname,
            telephone:_this.state.account,
            verificationCode:_this.state.code,
            password:_this.state.password,
        };

        HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/register.do',body)
            .then((data)=>{
                this.setState({animating:false});

                let {navigation} = _this.props;
                navigation.goBack();

            })
            .catch(e=>{
                this.setState({animating:false});
                Toast(e);
            });
    }

    _pop(){
        const {navigate,goBack,state} = this.props.navigation;
// 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
//         state.params.callback('回调参数');
        goBack();

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

    _sendVerifyBtnClicked(){
        if(this.state.nickname.length == 0){
            Toast('昵称不能为空');
            return;
        }

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


        HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/check4telephone.do', {telephone:this.state.account})
            .then((data)=>{

                HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/sms.do',{telephone:this.state.account,source:'0'})
                    .then((data1)=>{
                        this.setState({animating:false});
                        Toast(data1.desc);
                    })
                    .catch(e=>{
                        this.setState({animating:false});
                        Toast(e);
                    });

            })
            .catch(e=>{
                this.setState({animating:false});
                Toast(e);
            });




    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textBgInput: {
        flexDirection:'row',
        height:40,
        width:SCREEN_WIDTH - 40,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'white',
        borderColor:COLOR.theme,
        borderWidth: 0.5,
        borderRadius:3,
    },
    clearTextBgInput: {
        flexDirection:'row',
        height:40,
        width:SCREEN_WIDTH - 40,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'transparent'
    },
    textInput: {

        height:38,
        marginRight:0,
        color:'gray',
        fontSize:13,
        width:200,
        marginBottom:1,
        backgroundColor:'white'
    }
    ,logoStyle:{
        marginTop:100,
        marginLeft:(SCREEN_WIDTH - 120)/2,
        marginRight:(SCREEN_WIDTH - 120)/2,
        height:120,
        width:120,
        borderRadius:60
    },
    inputLeftImageStyle:{
        margin:2,
        width:40,
        height:36,

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
        borderColor:COLOR.theme,
        borderWidth: 0.5,
        borderRadius:3,
        flex:2,
        height:40,
        marginRight:0,
        //color:'gray',
        fontSize:13,
        width:200,
        backgroundColor:'white'
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
