import React from 'react';
import {StyleSheet,Image,View,TouchableWithoutFeedback,Text} from 'react-native';

import {COLOR,SCREEN_WIDTH} from '../util/config';

 import * as components from './'

 import CoreWebImgae from './CoreWebImage';
 import FastImage from 'react-native-fast-image';


 const MineIcon_Selected = require('../resource/tabbar/mine_selected.png');

export default ({subject,callback}) => {
  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View style={styles.container}>
        <CoreWebImgae
          style={styles.movieImage}
          source={{
              uri:subject.images.large,
              headers:{ Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
          }}
          defaultImage={MineIcon_Selected}
        />

        {/*
          <FastImage
              style={styles.movieImage}
              source={{
                  uri:subject.images.large,
                  headers:{ Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
              }}
              preload
              resizeMode={FastImage.resizeMode.contain}
          /> */}
        <View style={styles.rightPart}>
            <View>
              <Text style={{color:'red',fontSize:16}}>{`【 ${subject.title} 】`}</Text>
              <Text style={{color:'#aaa',paddingTop:2,width:80,textAlign:'center'}}>{`(${subject.year}年)`}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={{color:'#aaa'}}>{`导演:${subject.directors[0] ? subject.directors[0].name : '暂无'}`}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{color:'#aaa',fontSize:11}}>豆瓣评分:</Text>
                <Text style={{color:'red',fontSize:20,paddingLeft:2,fontFamily:'Cochin',fontWeight:'bold'}}>{subject.rating.average}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flexWrap:'nowrap'}}>
              <Text style={{color:'#aaa'}}>主演:</Text>
              {
                subject.casts.map((cast,i) => {
                  return (
                      <Text key={i} style={{color:'#aaa',margin:2}}>{cast.name}</Text>
                  )
                })
              }
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
     flexDirection:'row',
     backgroundColor:'white',
     width:SCREEN_WIDTH,
     height:140
  },
  movieImage:{
    width:100,
    height:130,
    margin:5
  },
  rightPart:{
    justifyContent:'space-between',
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    marginBottom:10
  },
  middle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:SCREEN_WIDTH-120
  },
  average:{
    flexDirection:'row',
    alignItems:'center'
  }

})
