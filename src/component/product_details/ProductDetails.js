import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Description from './Description';
import ProductTitle from '../products/ProductTitle';
import ProductBuy from '../products/ProductBuy';
import ProductImage from '../products/ProductImage';

export default class ProductDetails extends React.Component {
  static navigationOptions = {    
    title: 'Описание'    
  }

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam('product', {});
    const shop = navigation.getParam('shop', {});
    return (
      <ScrollView>
        <View style={styles.container}>
          <ProductImage source={product.image_source}/>
          <ProductTitle name={product.name} 
            description_short={product.description_short}/>
          <ProductBuy item={product}/>
          <Description productId={product.id} shop={shop}/>      
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   justifyContent: 'center',
   alignItems: 'center',
  }
})