/**
 * Sample React Native Share Extension
 * @flow
 */

import React, { Component } from 'react'
import ShareExtension from 'react-native-share-extension'
import Spinner from 'react-native-spinkit';
import RNFS from 'react-native-fs';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal
} from 'react-native';

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      isLoading: true,
      result: ''
    }
    this.send = this.send.bind(this)
  }

  send(filePath) {
    var serverURL = "https://www.google.cl";
    var audio = {
        uri: filePath,
        type: 'audio/ogg',
        name: 'audio.opus',
    };
    var body = new FormData();
    body.append('audio', audio);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', serverURL);
    xhr.send(body);

    RNFS.readFile(filePath, 'base64').then((content) => {
      this.setState({
        isLoading: false,
        result: 'hola'
      })
    })
    return "aaa";
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.send(value)
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    content = ''
    if(this.state.isLoading) {
      content = <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner isVisible={true} size={100} type={'Wave'} color={'#77B3D4'}/>
      </View>
    } else {
      content = <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#77B3D4'}}>Texto</Text>
        <ScrollView>
          <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.state.value }</Text>
          <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.state.result }</Text>
        </ScrollView>
      </View>
    }
    return (
      <Modal open={true} style={{flex: 1, alignItems: 'center'}} transparent={true} onRequestClose={() => {}}>
	      <View>
	        <View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', margin: 10, borderRadius: 2, padding: 5, flexDirection: 'column'}}>
	          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	            <Image
	              source={require('./images/eye.png')}
	              style={{width: 50, height: 50}}
	            />
	            <Text style={{marginLeft: 10, fontSize: 30, fontWeight: 'bold', color: '#77B3D4'}}>PAPIRO</Text>
	          </View>
            {content}
	        </View>
	      </View>
      </Modal>
    )
  }
}