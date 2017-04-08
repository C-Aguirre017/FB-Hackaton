/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Share from './share';
import Modal from 'react-native-modalbox'

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
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ backgroundColor: 'white', flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('./images/eye.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={{marginLeft: 10, fontSize: 30, fontWeight: 'bold', color: '#77B3D4'}}>PAPIRO</Text>
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>Texto</Text>
            <ScrollView>
              <Text style={{fontSize: 20, color: '#333333', textAlign: 'justify'}}></Text>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('boiler', () => boiler);
AppRegistry.registerComponent('MyShareEx', () => Share)

