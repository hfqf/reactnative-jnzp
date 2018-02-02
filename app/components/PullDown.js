import React, { Component } from 'react';
import {RefreshControl} from 'react-native'

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

export default ({action,refreshing,...props}) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={action}
      tintColor="#ff0000"
      title="加载中..."
      titleColor="#ff0000"
      colors={['#ff0000', '#00ff00', '#0000ff']}
      progressBackgroundColor="#ffff00"
    />
  )
}
