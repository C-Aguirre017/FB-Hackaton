/**
 * Sample React Native Share Extension
 * @flow
 */

import React, { Component } from 'react'
import ShareExtension from 'react-native-share-extension'
import Spinner from 'react-native-spinkit'
import I18n from 'react-native-i18n'

import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  BackAndroid,
  Picker
} from 'react-native';

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      isLoading: true,
      result: '',
      language: I18n.currentLocale(),
      filePath: '',
    }
    this.send = this.send.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this)
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  send() {
    this.setState({ isLoading: true })
    var serverURL = "http://ec2-54-207-100-233.sa-east-1.compute.amazonaws.com:3000/convert";
    const audio = {
      uri: this.state.filePath,
      type: 'audio/ogg',
      name: 'audio.ogg'
    }
    var body = new FormData();
    body.append('files[]', audio);
    body.append('language', this.state.language);
    fetch(serverURL,
    { 
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        "Content-Type": "multipart/form-data"
      },
      body: body
    })
    .then((res) => {
      res.text().then((text) =>  {
        this.setState({
          isLoading: false,
          result: text
        })
      })
    })
    .catch((e) => console.dir(e))
    .done()
  }

  changeLanguage(lang) {
    this.setState({ language: lang }, () => this.send())
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({ filePath: value }, () => this.send() )
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  render() {
    content = ''
    if(this.state.isLoading) {
      content = <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner isVisible={true} size={100} type={'Wave'} color={'#77B3D4'}/>
      </View>
    } else {
      content = <View>
          <Picker
            selectedValue={this.state.language}
            onValueChange={this.changeLanguage}
            style={{ marginTop: 10, marginBottom: 10 }}>
            <Picker.Item label="Español" value="es-US" />
            <Picker.Item label="Ingles" value="english" />
          </Picker>
        <ScrollView>
          <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.capitalizeFirstLetter(this.state.result) }</Text>
        </ScrollView>
      </View>
    }
    return (
      <Modal open={true} style={{flex: 1, alignItems: 'center'}} transparent={true} onRequestClose={() => { BackAndroid.exitApp(); }}>
	      <View>
	        <View style={{ borderWidth: 0, backgroundColor: 'white', margin: 15, borderRadius: 2, padding: 15, flexDirection: 'column' }}>
	          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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