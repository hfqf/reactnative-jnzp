import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  Alert
} from 'react-native';

import {SCREEN_WIDTH,SYSTEM} from '../util/config';
import * as components from '../components'

export default class EditProfile extends Component {

  static navigationOptions = ({navigation}) => {

 let {onDone,title} = navigation.state.params || {}

    return {
      headerTitle: title,
      headerRight:(
        <components.NavTextButton onPress={onDone}>
          完成
        </components.NavTextButton>
      )
    }
  };

  constructor(props){
    super(props);
    this.state = {
      result:''
    }
  }

 componentDidMount() {
   let {navigation} = this.props
   navigation.setParams({
     onDone: () => this.submit()
   })
 }

  render() {

    const {state: {params: {description}}} = this.props.navigation;

    return (
      <View  style={styles.container}>
        <components.Block>
          <components.TextInput
            placeholder={description}
            autoFocus
            maxLength={50}
            onChangeText={text => this.setState({result:text})}
            onSubmitEditing={() => this.submit()}
            style={{fontSize: 12}}
          />
        </components.Block>
      </View>
    );
  }

  submit() {

    const {navigate,goBack,state} = this.props.navigation;
    state.params.callback(this.state.result);
    goBack()
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#F5FCFF',
  }
});
