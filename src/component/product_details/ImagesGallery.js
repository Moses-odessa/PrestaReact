import React from 'react';
import { View, Text } from 'react-native';

export default class ImagesGallery extends React.Component {
  static navigationOptions = {    
    title: 'Изображения'    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ImagesGallery</Text>        
      </View>
    );
  }
}