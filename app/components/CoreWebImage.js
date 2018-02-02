import React, {
  Component,
} from 'react';

import {StyleSheet,Image,View,TouchableWithoutFeedback,Text} from 'react-native';
import FastImage from 'react-native-fast-image';


export default class CoreWebImgae extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded:false
    }
  }

  render() {
    return(
    //  let ({ style, source, defaultImage }) = this.props;
      <View>
        {
          this.state.loaded ? null :
            <Image source={this.props.defaultImage} style={this.props.style}/>
        }
        <FastImage
            style={this.props.style}
            source={this.props.source}
            // source={{
            //     uri:subject.images.large,
            //     headers:{ Authorization: 'someAuthToken' },
            //     priority: FastImage.priority.normal,
            // }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={() => this.setState({loaded:true})}
        />
      </View>

    )
  }

}
