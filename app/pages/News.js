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

const CELL_HIGH = 80;
import {SCREEN_WIDTH,SCREEN_HEIGHT,NAV_BAR_HEIGHT,STATUS_BAR_HEIGHT,TAB_BAR_HEIGHT,SYSTEM} from '../util/config';
import * as components from '../components'
import HTTP from '../util/http/HTTPManager';

import {LoadMoreFooter} from "../components/LoadMoreFooter";

export default class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            datas:[],
            isRefreshing:true,
            loadedData:false,
            times:undefined, //欧美票房榜的时间
            headerOpacity:0,
            loadMore:false,
            start:0,
            firstMount:true,
            length:0,
            isNeedLoadMore:false
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
                    ref={'FlatList'}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this._renderSep.bind(this)}
                    ListFooterComponent={this._renderListFooter.bind(this)}
                    onEndReachedThreshold={ SYSTEM.Android ? 1 : 0}
                    onEndReached={ () => this._onEndReached() }
                    refreshControl={
                        <RefreshControl onRefresh={() =>  this._getListTop250Data(0)}
                                        refreshing={this.state.isRefreshing}
                                        tintColor="#ff0000"
                                        title="加载中..."
                                        titleColor="#00ff00"
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
            <Text style={{height:300}} onPress={() => this.showContactDetail(item)}>{item.tel}</Text>
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
        if (!this.state.firstMount && !this.state.loadMore) {
            this.setState({
                loadMore:true
            })
            this._getListTop250Data(this.state.start)
        }
    }


    _getListTop250Data(start) {
        var that = this;

        if(this.state.length >= 20){

            that.setState({
                isNeedLoadMore:false
            })
            return;
        }

        HTTP.getContacts2('18251846048',this.state.start).then((v)=>{


            var datas = [ ];
            for(let  i=0;i<this.state.datas.length;i++){
                datas.push(this.state.datas[i]);
            }
            for(let  i=0;i<v.length;i++){
                datas.push(v[i]);
            }

            that.setState({
                isRefreshing:false,
                datas:datas,
                loadMore:false,
                firstMount:false,
                start:this.state.start+1,
                length:datas.length,
                isNeedLoadMore:datas.length<20
            })


        }).catch((e)=>{
            this.setState({
                isRefreshing:false
            })

        });

    }


    showContactDetail(contact) {
      let {navigation} = this.props
      navigation.navigate('ContactDetail',{
        title:contact.name,
        contact:contact
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
