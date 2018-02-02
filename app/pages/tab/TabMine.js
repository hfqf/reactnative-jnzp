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
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM} from '../../util/config';
import * as components from '../../components'
import SqliteDB from '../../util/sqlite/SqliteDBUtil';


var WEBVIEW_REF = 'webview';


export default class TabMine extends Component {

    constructor(props){
        super(props);

        const state = this.props.navigation;

        this.state = {
            url: 'http://www.baidu.com',
        }
    }



    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle:'4',
        headerLeft:(
            <Text  onPress={()=>{



            }} style={{marginLeft:5, width:30, textAlign:"center"}} >
                '首页左'
            </Text>
        ),
        headerRight:(
            <Text  onPress={()=>{


            }} style={{marginLeft:5, width:30, textAlign:"center"}} >
                '首页右'
            </Text>
        )
    });


    componentDidMount(){



    }

    leftItemBtnClicked(){


    }

    rightItemBtnClicked(){

        console.log('rightItemBtnClicked');
    }


    onMessage = e => {


        const _msg =  e.nativeEvent.data;
        console.log('onMessage'+_msg);

        Alert.alert(
            'H5->NATIVE',
            [
                {text: _msg, onPress: () => console.log('Ask me later pressed')},
            ],
            { cancelable: false }
        )
    }




    render() {

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
