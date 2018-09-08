import React from 'react';
import { Button, View, Text } from 'react-native';

export default class Categories extends React.Component {
  static navigationOptions = {
    title: 'Categories ',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>CategoriesTree</Text>
        <Button
          title="Go to Products"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Products', {
              itemId: 86,
              otherParam: 'Category Name',
            });
          }}
        />
      </View>
    );
  }
}