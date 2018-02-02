import React, { Component } from 'react'
import { Text, View, StyleSheet ,TouchableWithoutFeedback,Image} from 'react-native'

import Modal from 'react-native-modalbox';


import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

const shareIconWechat = require('../resource/share/shareIcon_wechat.png');
const shareIconWechatMoments = require('../resource/share/shareIcon_wechatMoment.png');
const shareIconQQ = require('../resource/share/shareIcon_qq.png');
const shareIconWeibo = require('../resource/share/shareIcon_weibo.png');
const shareIconQZone = require('../resource/share/shareIcon_qzone.png');



export default class ShareModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      shareContent:null
  }
}


 componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible, shareContent: nextProps.shareContent })
  }


  render() {

    // title:分享栏的标题
    const {title,wxAction, wxMomentAction, qqAction, wbAction,qZone} = this.props;
    return (
      <Modal
        swipeToClose={true}
        backButtonClose={false}
        coverScreen={true}
        isOpen={this.state.modalVisible}
        swipeThreshold={0}
        backdropPressToClose={true}
        position='bottom'
        style={{ backgroundColor:"transparent",height: 360 ,
                        position:"absolute",left:0,
                        width:SCREEN_WIDTH}}
        >
         <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:false})}>
          <View key={'spinner'} style={styles.spinner}>
            <View style={styles.mainView}>
              {/*<TitleView title={title} containerStyle={{fontSize:15}}/>*/}
              <View style={styles.btns}>
                <ShareBtn title='微信' icon={shareIconWechat} action={wxAction}/>
                <ShareBtn title='朋友圈' icon={shareIconWechatMoments} action={wxMomentAction}/>
                <ShareBtn title='QQ' icon={shareIconQQ} action={qqAction}/>
                <ShareBtn title='微博' icon={shareIconWeibo} action={wbAction}/>
                <ShareBtn title='QQ空间' icon={shareIconQZone} action={qZone}/>
              </View>
              {/*<TitleView title='取消' containerStyle={{color:'red'}} callback={() =>this.setState({modalVisible:false})}/>*/}
            </View>
          </View>
          </TouchableWithoutFeedback>
      </Modal>
    )
  }

}

 const TitleView = ({title,callback,containerStyle}) => {
  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View style={styles.titleView}>
        <Text style={containerStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const ShareBtn = ({action,title,icon}) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
        <Image source={icon} style={{width:40,height:40}}/>
        <Text style={{marginTop:2,textAlign:'center',color:'#aaa'}}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  mainView:{
    flexDirection:'column',
  },
  titleView:{
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH-20,
    height:40,
    borderRadius:8,
    margin:10,
    backgroundColor:'white'
  },
  btns:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    height:100,
    backgroundColor:'white',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'space-between'
  }
})
