import React from 'react';
import { View, Text } from 'react-native';

export default class ProductSpec extends React.Component {
  static navigationOptions = {    
    title: 'Спецификации'    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Product Spec</Text>        
      </View>
    );
  }
}