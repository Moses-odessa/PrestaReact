import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default class ProductImage extends React.Component {
    render() {
        const { source } = this.props;
        return (                   
            <Image style={styles.images}
              source={source}
            />            
        )
    }
}

const styles = StyleSheet.create({    
    images: {
        width: 100, 
        height: 100
    },
  })