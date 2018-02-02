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

import {SCREEN_WIDTH, COLOR, KEYS, SYSTEM,RN_HASFIX} from '../../util/config';
import * as components from '../../components'

//图片资源
const icon_message = require('../../resource/mine/icon_message.png');
const icon_notification = require('../../resource/mine/icon_message.png');
import DeviceInfo from 'react-native-device-info';
import HTTP from '../../util/http/HTTPManager';
import Toast from '../../util/toast/CaToastUtil';

export default class NotiSet extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle:'通知',
    });

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
