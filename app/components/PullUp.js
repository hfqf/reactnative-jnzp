import React, { Component } from 'react';
import {StyleSheet,RefreshControl,View,ActivityIndicator,Text} from 'react-native'

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

export default ({loadMore,...props}) => {
  return (
     loadMore ?
      <View style={styles.loadingMore}>
        <View></View>
        <View style={{flexDirection:'row'}}>
          <ActivityIndicator
            animating={true}
            size='small'
          />
          <Text style={{paddingLeft:5,color:'#aaa'}}>加载中...</Text>
        </View>
        <View></View>
      </View>
      :
      null
  )
}

const styles = StyleSheet.create({
   loadingMore:{
     flexDirection:'row',
     width:SCREEN_WIDTH,
     height:40,
     alignItems:'center',
     justifyContent:'space-between'
   }
})
