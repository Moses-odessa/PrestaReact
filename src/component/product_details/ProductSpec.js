import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FeaturesTable from './FeaturesTable';
import ProductTitle from '../products/ProductTitle';
import ProductBuy from '../products/ProductBuy';
import ProductImage from '../products/ProductImage';

export default class ProductSpec extends React.Component {
  static navigationOptions = {    
    title: 'Спецификации'    
  }

  render() { 
    const { navigation } = this.props;
    const product = navigation.getParam('product', {});
    return (
      <ScrollView>    
        <View style={styles.container}>        
          <ProductImage source={product.image_source}/>
          <ProductTitle name={product.name} description_short={product.description_short}/>
          <ProductBuy item={product}/>      
          <FeaturesTable productId={product.id} />   
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
  },
  item: {
    flex: 1,  
    padding: 5,
    height: 100,
    flexDirection: 'row',
  },
})