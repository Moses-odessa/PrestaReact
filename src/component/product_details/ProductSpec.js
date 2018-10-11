import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FeaturesTable from './FeaturesTable';
import ProductTitle from '../products/ProductTitle';
import ProductBuy from '../products/ProductBuy';
import ProductImage from '../products/ProductImage';
import { getLangTitle } from '../../utils/LangService';

export default class ProductSpec extends React.Component {
  static navigationOptions = {    
    title: getLangTitle('RU', 'Features')    
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
          <ProductBuy item={product} shop={shop}/>      
          <FeaturesTable productId={product.id} shop={shop}/>   
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