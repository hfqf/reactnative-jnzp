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

export default class TestPage extends Component {

  static navigationOptions = ({navigation}) => {

    return {
        title: '详情'
    }
  };


  constructor(props){
    super(props);
  }

  render() {

    const {state: {params: {name}}} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
      </View>
    );
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
