import React from 'react';
import { Button, View, Text } from 'react-native';

export default class Products extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Products list</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('ProductDetails', {
              itemId: 86,
              otherParam: 'Products Title',
            });
          }}
        />
      </View>
    );
  }
}