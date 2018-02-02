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

export default class TabTakeData extends Component {



    constructor(props){
        super(props);
        that = this;
        const _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
        console.log('TabTakeData constructor'+JNZP_URLS.takedata+_url);

        this.state = {
            baseUrl:JNZP_URLS.takedata,
            url: JNZP_URLS.takedata+_url,
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

            console.log(' DeviceEventEmitter.addListener'+JSON.stringify(e));
            if(e ==  'tab2'){
                const _url = 'mac='+DeviceUtil.getMac()+'&imei='+DeviceUtil.getImei()+'&idfa='+DeviceUtil.getIdfa();
                console.log('TabTakeData constructor reload'+JNZP_URLS.takedata+_url);

                this.setState({
                    url: JNZP_URLS.takedata+_url,
                })

                that.reload();
            }

        });

    }

    // _setOnesState= (_arr,callback) => {
    //
    //     let   _isShowLeftBtn = false
    //     let   _leftBtnTitle  = '1'
    //     let   _leftleftBtnJS = ''
    //     let   _isShowRightBtn = false
    //     let   _rightBtnTitle = '3'
    //     let   _rightBtnJS = ''
    //     let   _headerTitle=''
    //     for(let i=0 ;i<_arr.length;i++){
    //         const  info = _arr[i];
    //         if(info.menuType == 'left'){
    //             _isShowLeftBtn=true
    //             _leftBtnTitle=info.menuName
    //             _leftleftBtnJS=info.menuEvent
    //
    //         }else if(info.menuType == 'right'){
    //             _isShowRightBtn=true
    //             _rightBtnTitle=info.menuName
    //             _rightBtnJS=info.menuEvent
    //         }else if(info.menuType == 'center') {
    //             _headerTitle=info.menuName
    //         }
    //     }
    //
    //     that.setState({
    //             isShowLeftBtn:_isShowLeftBtn,
    //             leftBtnTitle:_leftBtnTitle,
    //             leftBtnJS:_leftleftBtnJS,
    //             isShowRightBtn:_isShowRightBtn,
    //             rightBtnTitle:_rightBtnTitle,
    //             rightBtnJS:_rightBtnJS,
    //             headerTitle:_headerTitle,
    //         },function () {
    //             callback();
    //         }
    //     );
    //
    //
    //
    // }

    onMessage = e => {
        const _json =  JSON.parse(e.nativeEvent.data);
        const  _info = _json.jump[0];
        console.log('onMessage'+JSON.stringify(_info));

        DeviceUtil.setKeyword(_info.keyword);

        if(_info.module == 'analysis'){

            that.props.navigation.navigate('tab3',{info:JSON.stringify(_info)});

        }else if(_info.module == 'delivery'){

            that.props.navigation.navigate('tab4',{info:JSON.stringify(_info)});

        }



        // that._setOnesState(_arr,function () {
        //
        //     const {state, setParams } = that.props.navigation;
        //     setParams({ leftBtnTitle: that.state.leftBtnTitle,rightBtnTitle: that.state.rightBtnTitle ,headerTitle:that.state.headerTitle});
        //
        // });

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
