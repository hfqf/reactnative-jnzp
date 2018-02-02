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
import SqliteDB from '../util/sqlite/SqliteDBUtil';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      account:'',
      password:'',
        user:'ok'

    }
  }

    componentWillMount(){

        var _this = this;
        SqliteDB.getLoginedUserInfo(function (err,doc) {
            if(err){

            }else {
                _this.setState({
                      user:doc
                    });
            }
        });

    }



  render() {

      return (

          <View style={styles.container}>
            <components.Button title={this.state.user.tel} callback={() => this.switchToTest()}></components.Button>
          </View>
      );

  }

  switchToTest() {
    let {navigation} = this.props

   navigation.navigate('TestPage',{
   title:'测试',
   name:'woqu',
  })
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
