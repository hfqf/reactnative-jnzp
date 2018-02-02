import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
} from 'react-native';

import {SCREEN_WIDTH,SYSTEM} from '../util/config';
import * as components from '../components'
import UShare from '../share/share'
import SharePlatform from '../share/SharePlatform'

export default class SharePage extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <components.Button title='微信' callback={() => this.shareTo(SharePlatform.WECHAT)}></components.Button>
        <components.Button title='朋友圈' callback={() => this.shareTo(SharePlatform.WECHATMOMENT)}></components.Button>
        <components.Button title='QQ' callback={() => this.shareTo(SharePlatform.QQ)}></components.Button>
        <components.Button title='微博' callback={() => this.shareTo(SharePlatform.SINA)}></components.Button>
      </View>
    );
  }

  shareTo(type) {

    UShare.share('coreapp','这是一条分享测试信息','http://baidu.com','http://dev.umeng.com/images/tab2_1.png', type,
      (code, message) => {
          // 分享成功：code=200
          // ToastAndroid.show(message,ToastAndroid.SHORT);

  });
  }





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
