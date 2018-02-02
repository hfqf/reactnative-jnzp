import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import {COLOR} from '../util/config'

export default ({leftImg, leftText, rightText,
                    onPress, containerStyle}) => {
    let leftChild = (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {leftImg
                ? <Image
                    source={leftImg}
                    style={styles.leftImg}
                  />
                : null}
            <Text style={styles.text}>
                {leftText}
            </Text>
        </View>
    )
    let rightChild = (
        <Text style={styles.text}>
            {rightText}
        </Text>
    )
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}

            >
              <View style={[styles.container, containerStyle]}>
                  {leftChild}
                  {rightChild}
              </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={[styles.container, containerStyle]}>
                {leftChild}
                {rightChild}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLOR.lineEmpha,
        borderTopWidth: 0.5,
        backgroundColor:'white'
    },
    leftImg: {
        marginRight: 5,
        width:25,
        height:25,
        marginLeft:20
    },
    text: {
        fontSize:14,
        color: COLOR.textNormal,
        marginRight:40,
    }
})
