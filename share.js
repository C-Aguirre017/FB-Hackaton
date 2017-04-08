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
      type: '',
      value: ''
    }
    this.send = this.send.bind(this)
  }

  send(file_path) {
    RNFS.readFile(file_path, 'base64').then((content) => {
      console.dir(content)
    })
    return "aaa";
  }

  async componentDidMount() {
    try {
      console.dir(await ShareExtension.data())
      const { type, value } = await ShareExtension.data()
      console.dir(type)
      console.dir(value)
      this.setState({
        type,
        value
      })
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
    return (
      <Modal open={true} style={{flex: 1, alignItems: 'center'}} transparent={true}>
	      <View>
	        <View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', margin: 10, borderRadius: 2, padding: 5, flexDirection: 'column'}}>
	          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	            <Image
	              source={require('./images/eye.png')}
	              style={{width: 50, height: 50}}
	            />
	            <Text style={{marginLeft: 10, fontSize: 30, fontWeight: 'bold', color: '#77B3D4'}}>PAPIRO</Text>
	          </View>
	          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	            <Spinner isVisible={true} size={100} type={'Wave'} color={'#77B3D4'}/>
	          </View>
	          <View>
	            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#77B3D4'}}>Texto</Text>
	            <ScrollView>
                <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.state.value }</Text>
	              <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.send(this.state.value) }</Text>
	            </ScrollView>
	          </View>
	        </View>
	      </View>
      </Modal>
    )
  }
}