import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import {SCREEN_WIDTH,SYSTEM} from '../util/config';
import * as components from '../components'


export default class Movie extends Component {
  constructor(props){
    super(props);
    this.state = {
      datas:[],
       isRefreshing:true,
       loadedData:false,
       times:undefined, //欧美票房榜的时间
       headerOpacity:0,
       loadMore:false,
       isNeedLoadMore:false,
       start:0,
       firstMount:true
    }
  }

 componentDidMount() {
   this._getListTop250Data(0);
 }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.datas}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSep}
          ListFooterComponent={this._renderListFooter()}
          getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
          onEndReachedThreshold={SYSTEM.Android ? 1 : 0}
          onEndReached={() => this._onEndReached()}

          refreshControl={
              <RefreshControl onRefresh={() =>  this._getListTop250Data(0)}
               refreshing={this.state.isRefreshing}
              tintColor="#aaa"
              title="加载中..."
              titleColor="#aaa"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
              />

       }
        />
      </View>

    );
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => this.state.datas.length + index;

  _renderItem({item,index}) {
    return (
      <components.MovieItem
        subject={item.subject ? item.subject : item}
      />
    )
  }

  _renderSep() {
    return (
      <View style={styles.sep}></View>
    )
  }

  _renderListFooter() {
     return (
          this.state.isNeedLoadMore ?
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

  _onEndReached() {

    if (this.state.datas.length < 250) {
       this._getListTop250Data(this.state.start)
  }
}

  _getListTop250Data(start) {
    var that = this;
    fetch(`https://api.douban.com/v2/movie/top250?start=${start}`).then((response)=>
    response.json()).then((responseJson) =>{
      if (responseJson.count) {
        var datas = [ ];
        if (start == 0) {
          datas = responseJson.subjects
        }else {
          datas = this.state.datas.concat(responseJson.subjects)
        }
        if (datas.length === 250) {
          alert('无更多数据.')
        }

        that.setState({
          isRefreshing:false,
          datas:datas,
          loadMore:false,
          firstMount:false,
          start:this.state.start+20,
          isNeedLoadMore:datas.length < 250
        })
      }
    }).catch(() => {
      this.setState({
        isRefreshing:false
      })
    })
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sep:{
    backgroundColor:'#DDDDDD',
    width:SCREEN_WIDTH - 10,
    height:0.5,
    marginLeft:5,
    marginRight:5
  },
    loadingMore:{
        flexDirection:'row',
        width:SCREEN_WIDTH,
        height:40,
        alignItems:'center',
        justifyContent:'space-between'
    }
});
