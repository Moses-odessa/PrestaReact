import React from 'react';
import { View, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class ProductDetails extends React.Component {
  static navigationOptions = {    
    title: 'Описание'    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Product Details</Text>        
      </View>
    );
  }
}
