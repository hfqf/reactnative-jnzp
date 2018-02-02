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
    DeviceEventEmitter
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,DeviceUtil,JNZP_URLS} from '../../util/config';
import * as components from '../../components/index'
import SqliteDB from '../../util/sqlite/SqliteDBUtil';


const WEBVIEW_REF = 'webview';

let that;

export default class TabAnalysis extends Component {



    constructor(props){
        super(props);
        that = this;

        const _info =  this.props.navigation.state.params.info;
        let _url;
        if(_info){
            const  info = JSON.parse(_info);
            _url = 'mac='+info.mac+'&imei='+info.imei+'&idfa='+info.idfa+'&keyword='+info.keyword;
        }else {
            _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
        }

        console.log('TabAnalysis constructor1'+JNZP_URLS.analysis+_url);

        this.state = {
            baseUrl:JNZP_URLS.analysis,
            url: JNZP_URLS.analysis+_url,
            isShowLeftBtn:false,
            leftBtnTitle:'',
            leftBtnJS:'',
            headerTitle:'',
            isShowRightBtn:false,
            rightBtnTitle:'',
            rightBtnJS:'',
        }

    }


    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
        // headerTitle:`${navigation.state.params.headerTitle}`,
        // headerLeft:(
        //     <Text  onPress={()=>{
        //         that.leftItemBtnClicked();
        //     }} style={{marginLeft:5, width:80, textAlign:"center"}} >
        //         {navigation.state.params.leftBtnTitle}
        //     </Text>
        // ),
        // headerRight:(
        //     <Text  onPress={()=>{
        //         that.rightItemBtnClicked();
        //     }} style={{marginLeft:5, width:80, textAlign:"center"}} >
        //         {navigation.state.params.rightBtnTitle}
        //     </Text>
        // )
    });

    componentWillUnmount(){
        DeviceEventEmitter.removeAllListeners();
    };


    componentDidMount(){

        DeviceEventEmitter.addListener('RELOAD_TAB', e=>{

            console.log(' DeviceEventEmitter.addListener'+e);
            if(e ==  'tab3'){
                const _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
                console.log('TabAnalysis constructor reload2'+JNZP_URLS.analysis+_url);

                this.setState({
                    url: JNZP_URLS.analysis+_url,
                })

                that.reload();
            }

        });

        //
        // DeviceEventEmitter.addListener('analysis', e=>{
        //     const  info = JSON.parse(e);
        //     const _url = 'mac='+info.mac+'&imei='+info.imei+'&idfa='+info.idfa+'&keyword='+info.keyword;
        //     this.setState({
        //         url: JNZP_URLS.analysis+_url,
        //     })
        //     that.reload();
        // });
        //


    }


    onMessage = e => {
        const _json =  JSON.parse(e.nativeEvent.data);
        const  _info = _json.jump[0];
        console.log('onMessage'+JSON.stringify(_info));

        DeviceUtil.setKeyword(_info.keyword);

        if(_info.module == 'analysis'){
            const _url = 'mac='+_info.mac+'&imei='+_info.imei+'&idfa='+_info.idfa+'&keyword='+_info.keyword;
            this.setState({
                url: JNZP_URLS.analysis+_url,
            })
            that.reload();
        }else if(_info.module == 'delivery'){

            that.props.navigation.navigate('tab4',{info:JSON.stringify(_info)});

        }



    }

    render() {

        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
        };

        const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';


        return (

            <View style={styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-20,backgroundColor:'gray'}}
                    source={{uri:this.state.url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    onMessage={this.onMessage.bind(this)}
                    injectedJavaScript={patchPostMessageJsCode}
                />
            </View>
        );

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

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
