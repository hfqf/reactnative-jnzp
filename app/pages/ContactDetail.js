import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import {SCREEN_WIDTH,SYSTEM} from '../util/config';
import * as components from '../components'

export default class ContactDetail extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.state.params.title
    }
  }


  constructor(props){
    super(props);

    const {state: {params: {contact}}} = this.props.navigation;

    this.state = {
      tel:contact.tel
    }

  }

  render() {
   const {state: {params: {contact}}} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.logoStyle} source={require('../resource/images/logo.png')}/>
          <components.Block containerStyle={{paddingVertical: 0}}>
            <components.BlockItem
              leftText='姓名'
              rightText={contact.name || '未填写'}
              rightIcon='keyboard-arrow-right'
              containerStyle={{borderTopWidth: 0}}
            />
            <components.BlockItem
              leftText='手机号码'
              rightText={this.state.tel || '未填写'}
              rightIcon='keyboard-arrow-right'
              onPress={() => this.chnageInfo((data) => {this.setState({tel:data})},'请输入新的手机号码')}
              containerStyle={{borderTopWidth: 0}}
            />
            <components.BlockItem
              leftText='车牌号'
              rightText={contact.carcode || '未填写'}
              rightIcon='keyboard-arrow-right'
              containerStyle={{borderTopWidth: 0}}
            />
            <components.BlockItem
              leftText='车名'
              rightText={contact.cartype|| '未填写'}
              rightIcon='keyboard-arrow-right'
              containerStyle={{borderTopWidth: 0}}
            />
            <components.BlockItem
              leftText='保险公司'
              rightText={contact.safecompany || '未填写'}
              rightIcon='keyboard-arrow-right'
              containerStyle={{borderTopWidth: 0}}
            />
          </components.Block>
          <Text style={{color:'red',fontSize:20,margin:20}}>⚠️暂时只能修改手机号码</Text>
        </ScrollView>
      </View>
    );
  }

  chnageInfo(callback,description) {
    let {navigation} = this.props

   navigation.navigate('EditProfile',{
     title:'修改手机号码',
     description:description,
     callback:callback
     })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  logoStyle:{
        marginTop:50,
        marginBottom:50,
        marginLeft:(SCREEN_WIDTH - 120)/2,
        marginRight:(SCREEN_WIDTH - 120)/2,
        height:120,
        width:120,
        borderRadius:60
    },
});
