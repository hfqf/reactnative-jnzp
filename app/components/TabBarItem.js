import React, { Component } from 'react';
import {Image} from 'react-native'

export default ({tintColor,focused,normalImage,selectedImage,...props}) => {
  return (
    <Image source={focused ? selectedImage : normalImage }
               style={ { tintColor:tintColor,width:25,height:25 } }
           />
  )
}
