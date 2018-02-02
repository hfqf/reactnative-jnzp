import React, { Component } from 'react';
import {Text,StyleSheet} from 'react-native'


export default ({children, style, ...props}) => {
  return (
    <Text {...props} style={[styles.text, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'transparent',
    padding: 5
  }
})
