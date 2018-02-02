import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

export default class LoadMoreFooter extends Component {



    constructor(props){
        super(props);
        this.state = {
            isLoadAll:false

        }
    }

    render() {
        return (
            <View style={styles.footer}>
                <ActivityIndicator animating={!this.props.isLoadAll} />
                <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多…'}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 13,
        color: 'gray'
    }
})

module.exports = LoadMoreFooter;
