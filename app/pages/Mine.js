import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {SCREEN_WIDTH, COLOR, KEYS, SYSTEM,RN_HASFIX} from '../util/config';
import * as components from '../components'
import {navToLogin} from '../Navigation'

//图片资源
const icon_message = require('../resource/mine/icon_message.png');
const icon_notification = require('../resource/mine/icon_message.png');
import DeviceInfo from 'react-native-device-info';
import HTTP from '../util/http/HTTPManager';
import Toast from '../util/toast/CaToastUtil';

export default class Mine extends Component {

  constructor(props){
    super(props);
      this.state = {
          name: '',
          headurl:'',
          id:'',
          islogined:false,

      }
  }


    componentWillMount(){

        AsyncStorage.getItem(KEYS.ISKOGINED).then((ret)=>{
            this.setState({islogined:parseInt(ret) == 1});
            console.log('ISKOGINED'+ret);
        });

        AsyncStorage.getItem(KEYS.NAME).then((ret)=>{
            console.log('NAME'+ret);
            this.setState({name:ret});
        });

        AsyncStorage.getAllKeys().then((ret)=>{
            console.log('getAllKeys'+ret);
        });

    }

  render() {

      let loginBtn = this.state.islogined ?
          <TouchableOpacity onPress={() => this.logout()}>
        <View style={styles.logout}>
          <Text>退出登陆</Text>
        </View>
      </TouchableOpacity>:null;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress ={()=>{

                if(this.state.islogined){

                    let {navigation} = this.props
                    navigation.navigate('WebViewDetail',{
                        url:'https://allison.jsjunqiao.com:6443/mt/allison/userInfo.do'+'?deviceId='+DeviceInfo.getUniqueID()+RN_HASFIX,
                        headerTitle:'个人信息',
                        isShowLeftBtn:false,
                        isShowRightBtn:false,
                        leftBtnTitle:'',
                        rightBtnTitle:'',
                        leftBtnJS:'',
                        rightBtnJS:''
                    });

                }else {
                    let {navigation} = this.props
                    navigation.navigate('Login', {
                        onLogined: () => {


                            const body = {
                                deviceId: DeviceInfo.getUniqueID(),
                            };

                            HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/getLoginUserInfo.do', body)
                                .then((data) => {

                                    AsyncStorage.setItem(KEYS.ISKOGINED, '1')
                                        .then(() => {
                                            this.setState({islogined: true});
                                        }).catch();

                                    AsyncStorage.setItem(KEYS.NAME, data.data.account)
                                        .then(() => {
                                        this.setState({name: data.data.account});
                                    }).catch();

                                    AsyncStorage.setItem(KEYS.HEADURL, data.data.headimgurl)
                                        .then(() => {
                                            this.setState({headurl: data.data.headimgurl});
                                        }).catch();

                                    AsyncStorage.setItem(KEYS.USERID, String(data.data.id))
                                        .then(() => {
                                            this.setState({id: String(data.data.id) });
                                        }).catch();


                                });
                        }
                    });








                }
            }}>
              <Image style={styles.avator}
                     source={ this.state.headurl.length == 0 ? require('../resource/images/logo.png') :{uri:this.state.headurl}}
              />
            </TouchableOpacity>

            <View>
              <Text style={{marginTop:20}}>{this.state.islogined ?this.state.name:'登录/注册'}</Text>
            </View>

          </View>
          {this.renderSectionHeader('通知')}
          <components.MineItem leftImg={icon_message} leftText='我的消息' onPress={() => {


              if(this.state.islogined){

                  let {navigation} = this.props
                  navigation.navigate('WebViewDetail',{
                      url:'https://allison.jsjunqiao.com:6443/mt/allison/tidings.do'+'?deviceId='+DeviceInfo.getUniqueID()+RN_HASFIX,
                      headerTitle:'我的消息',
                      isShowLeftBtn:false,
                      isShowRightBtn:false,
                      leftBtnTitle:'',
                      rightBtnTitle:'',
                      leftBtnJS:'',
                      rightBtnJS:''
                  });

              }else {
                  let {navigation} = this.props
                  navigation.navigate('Login');
              }



          }}/>
          <components.MineItem leftImg={icon_notification} leftText='我的收藏' onPress={() => {

              if(this.state.islogined){

                  let {navigation} = this.props
                  navigation.navigate('WebViewDetail',{
                      url:'https://allison.jsjunqiao.com:6443/mt/allison/collect.do'+'?deviceId='+DeviceInfo.getUniqueID()+RN_HASFIX,
                      headerTitle:'我的收藏',
                      isShowLeftBtn:false,
                      isShowRightBtn:false,
                      leftBtnTitle:'',
                      rightBtnTitle:'',
                      leftBtnJS:'',
                      rightBtnJS:''
                  });

              }else {
                  let {navigation} = this.props
                  navigation.navigate('Login');
              }


          }}/>
          {this.renderSectionHeader('企业服务')}
          <components.MineItem leftImg={icon_message} leftText='我的反馈' onPress={() => {

              if(this.state.islogined){

                  let {navigation} = this.props
                  navigation.navigate('WebViewDetail',{
                      url:'https://allison.jsjunqiao.com:6443/mt/allison/feedback.do'+'?deviceId='+DeviceInfo.getUniqueID()+RN_HASFIX,
                      headerTitle:'我的反馈',
                      isShowLeftBtn:false,
                      isShowRightBtn:false,
                      leftBtnTitle:'',
                      rightBtnTitle:'',
                      leftBtnJS:'',
                      rightBtnJS:''
                  });

              }else {
                  let {navigation} = this.props
                  navigation.navigate('Login');
              }


          }}/>
          {this.renderSectionHeader('其他')}
          <components.MineItem leftImg={icon_notification} leftText='账号安全' onPress={() => {

              let {navigation} = this.props

              navigation.navigate('VerifyCodeLogin',{
                  title:'验证码登录',
              })



          }}/>
          <components.MineItem leftImg={icon_message} leftText='清除缓存' rightText='27.8M' onPress={() => {


          }}/>
          <components.MineItem leftImg={icon_notification} leftText='分享给好友' onPress={() => {


          }}/>

            {loginBtn}
        </ScrollView>
      </View>
    );
  }

  renderSectionHeader(name) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={{marginLeft:20, color: COLOR.textNormal}}>{name}</Text>
      </View>
    )
  }

  logout() {


      const body = {
          deviceId: DeviceInfo.getUniqueID(),
      };

      HTTP.startPostPromise('https://allison.jsjunqiao.com:6443/mt/api/logout.do', body)
          .then((data) => {

              Toast('退出成功');
              AsyncStorage.setItem(KEYS.ISKOGINED, '')
                  .then(() => {
                      this.setState({islogined: false});
                  }).catch();

              AsyncStorage.setItem(KEYS.NAME, '')
                  .then(() => {
                      this.setState({name:'登录/注册'});
                  }).catch();

              AsyncStorage.setItem(KEYS.HEADURL, '')
                  .then(() => {
                      this.setState({headurl: ''});
                  }).catch();

              AsyncStorage.setItem(KEYS.USERID, '')
                  .then(() => {
                      this.setState({id: ''});
                  }).catch();


          }).catch((e)=>{

          Toast('退出失败');


      });


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundNormal,
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH,
    height:200,
  },
  avator:{
    width:80,
    height:80,
    borderRadius:40
  },
  sectionHeader:{
    height:40,
    justifyContent:'center'
  },
  logout:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    height:40,
    marginTop:40,
    marginBottom:40
  }
});
