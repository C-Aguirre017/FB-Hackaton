/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Share from './share';
import Modal from 'react-native-modalbox'
import Spinner from 'react-native-spinkit';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

export default class boiler extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
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
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>Texto</Text>
            <ScrollView>
              <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}>{ this.state.value }</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('boiler', () => boiler);
AppRegistry.registerComponent('MyShareEx', () => Share)

