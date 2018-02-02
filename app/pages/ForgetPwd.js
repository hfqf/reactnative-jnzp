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

import {SCREEN_WIDTH,SYSTEM} from '../util/config'
import * as components from '../components'
import {navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

import SqliteDB from '../util/sqlite/SqliteDBUtil';
import DeviceInfo from 'react-native-device-info';


export default class ForgetPwd extends Component {

    static navigationOptions = {
        headerTitle:'重置密码',
        gesturesEnabled:true
    };

    constructor(props){
        super(props);
        SqliteDB.init();
        this.state = {
            code:'',
            account:'',
            pwd1:'',
            pwd2:'',
            animating:false
        }
    }


    render() {
        return (
            <ScrollView  style={styles.container}>
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
                    <components.Button style={styles.codeBtnStyle} title='发送验证码' callback={() => this._sendVerifyBtnClicked()}></components.Button>

                </View>

                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/images/logo.png')}/>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='pwd1'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({pwd1:text}) }
                        placeholder='请输入新密码'
                    />

                </View>

                <View style={styles.textBgInput}>

                    <Image style={styles.inputLeftImageStyle} source={require('../resource/images/logo.png')}/>

                    <TextInput
                        underlineColorAndroid = 'transparent'
                        ref='pwd2'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({pwd2:text}) }
                        placeholder='请再次确认密码'
                    />

                </View>

                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="large" />

                <components.Button style={{backgroundColor:'#3da0ff'}} title='完成' callback={() => this._registerBtnClicked()}></components.Button>

            </ScrollView>
        );
    }

    _registerBtnClicked() {
        var _this = this;



        if(this.state.account.length==0){
            Toast('账号不能为空');
            return;
        }

        if(this.state.pwd1.length==0){
            Toast('新密码不能为空');
            return;
        }

        if(this.state.pwd2.length==0){
            Toast('确认密码不能为空');
            return;
        }

        if(this.state.pwd1 != this.state.pwd2){
            Toast('两次密码不一致');
            return;
        }


        if(this.state.code.length==0){
            Toast('验证码不能为空');
            return;
        }



        this.setState({animating:true});

        const body ={
            telephone:_this.state.account,
            verificationCode:_this.state.code,
            password1:_this.state.pwd1,
            password2:_this.state.pwd2,
        };

        HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/forgetPassword.do',body)
            .then((data,msg)=>{
                this.setState({animating:false});

                let {navigation} = _this.props;
                navigation.navigate('MyTab');

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

    _sendVerifyBtnClicked(){
        if(this.state.account.length == 0){
            Toast('手机号不能为空');
            return;
        }

        this.setState({animating:true});


        HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/check4account.do', {account:this.state.nickname})
            .then((data1)=>{

                HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/sms.do',{telephone:this.state.account,source:'2'})
                    .then((data2)=>{
                        this.setState({animating:false});
                        Toast(data2.data.desc);
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
        backgroundColor:'white'
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
        height:40,
        marginRight:0,
        color:'gray',
        fontSize:13,
        width:200,
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
        flex:2,
        height:40,
        marginRight:0,
        //color:'gray',
        fontSize:13,
        width:200,
        backgroundColor:'white'
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
