import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProductBuy from './ProductBuy';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';

export default class ProductsItem extends React.Component {
    render() {
        const { item, navigation } = this.props;
        const shop = navigation.getParam('shop', {})
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('DetailsStack', {
              shop: shop,
              product: item
            });
          }}>
          <View style={styles.item}>          
            <ProductImage source={item.image_source} />
            <ProductTitle name={item.name} 
              description_short={item.description_short}/>            
            <ProductBuy item={item}/>    
          </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      flex: 1,  
      padding: 5,
      flexDirection: 'row',
    },
  })