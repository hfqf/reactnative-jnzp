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
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM} from '../util/config';
import * as components from '../components'
import SqliteDB from '../util/sqlite/SqliteDBUtil';

import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

// const url = HTTP.URL+'/login';
// const url = 'https://allison.jsjunqiao.com:6443/mt/allison/product.do';

const url = 'http://192.168.30.15:18080/login';


var WEBVIEW_REF = 'webview';
var LEFT_TEXT = 'LEFT_TEXT';
var RIGHT_TEXT = 'RIGHT_TEXT';
let _this;

export default class Home extends Component {



    constructor(props){
        super(props);
        _this = this;
        this.state = {
            leftItemTitle:'返回',
            rightItemTitle:'通知',
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle:'首页',
    });


    componentDidMount(){

        // this.refs[LEFT_TEXT].value = '11';

    }

    leftItemBtnClicked=()=>{

        let left =  this.refs[LEFT_TEXT];

        // let {navigation} = this.props
        // navigation.navigate('WebViewDetail',{
        //     isNeedLeftBtn:true,
        //     leftBtnTitle:'left',
        //     title:'工厂1',
        //     url:'http://www.baidu.com'
        // })

    }


    rightItemBtnClicked=()=>{

        console.log('rightItemBtnClicked');

        this.refs[WEBVIEW_REF].postMessage("33");

    }


    onMessage = e => {
        const _json = String(e.nativeEvent.data);
        Toast(_json);
    }


  render() {

      return (



          <View style={styles.container}>
              {/*<View style={styles.navibg}>*/}
                  {/*<TouchableOpacity  style={styles.yzmLoginStyle}  onPress={this.leftItemBtnClicked.bind(this)} activeOpacity={1}>*/}
                      {/*<Text style={styles.yzmLoginBtnStyle}>*/}
                          {/*{this.state.leftItemTitle}*/}
                      {/*</Text>*/}
                  {/*</TouchableOpacity>*/}
                  {/*<TouchableOpacity  style={styles.forgetStyle}  onPress={this.rightItemBtnClicked.bind(this)} activeOpacity={1}>*/}
                      {/*<Text style={styles.forgetBtnStyle}>*/}
                          {/*{this.state.rightItemTitle}*/}
                      {/*</Text>*/}
                  {/*</TouchableOpacity>*/}
              {/*</View>*/}
              <WebView
                  ref={WEBVIEW_REF}
                  style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-64,backgroundColor:'gray'}}
                  source={{uri:url,method: 'GET'}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  // scalesPageToFit={true}
                   onMessage={this.onMessage.bind(this)}
                  startInLoadingState={true}
              />
            <ScrollView>
              <components.Button title={'3333'} callback={() => this.switchToTest()}></components.Button>
              <components.Button title='百度地图Demo' callback={() => this.switchToBaiduMap()}></components.Button>
              <components.Button title='分享demo' callback={() => this.switchToSharePage()}></components.Button>
            </ScrollView>
          </View>
      );

  }

  switchToTest() {
      let {navigation} = this.props
      navigation.navigate('TestPage',{
          title:'测试'
      });
  }

  switchToSharePage() {
      let {navigation} = this.props
      navigation.navigate('SharePage',{
          title:'分享'
      });
  }


    goBack = () => {
        this.refs[WEBVIEW_REF].goBack();
    };

    goForward = () => {
        this.refs[WEBVIEW_REF].goForward();
    };

    reload = () => {
        this.refs[WEBVIEW_REF].reload();
    };

/**
 * 跳转到百度地图demo
 */
  switchToBaiduMap() {
   let {navigation} = this.props
   navigation.navigate('BaiduMap',{
   title:'百度地图'
   });
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

    navibg: {
        width:SCREEN_WIDTH,
        height:84,
        flexDirection:'row',
        backgroundColor: '#129263',
        justifyContent:'space-between'

    },
    menuBgStyle:{
        // backgroundColor:'transparent',
        backgroundColor:'blue',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    yzmLoginStyle:{
        backgroundColor:'transparent',
        marginTop:0,
        marginLeft:0,
        height:35,
        width:100,
    },

    yzmLoginBtnStyle:{

        fontSize:16,
        backgroundColor:'transparent',
        textAlign:'left',
        textAlignVertical:'center',
        marginTop:45,
        marginLeft:0,
        height:35,
        width:100,
    },

    forgetStyle:{
        backgroundColor:'transparent',
        marginTop:0,
        marginRight:0,
        height:35,
        width:100,
        // color:'#676767',

    },

    forgetBtnStyle:{
        fontSize:16,
        backgroundColor:'transparent',
        marginTop:45,
        marginRight:0,
        height:35,
        width:100,
        textAlign:'right',
        alignSelf:'flex-end',
        textAlignVertical:'center',

    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },

});
