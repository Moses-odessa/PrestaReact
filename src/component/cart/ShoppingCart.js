import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import ProductTitle from '../products/ProductTitle';
import ProductImage from '../products/ProductImage';
import CartEditProduct from './CartEditProduct';

class ShoppingCart extends React.Component {
    static navigationOptions = {    
        title: 'Корзина'    
    }

      render() {         
        const shop = this.props.navigation.getParam('shop', {}); 
        const allCarts = this.props.navigation.getScreenProps().allCarts 
        const shopCart =allCarts[shop.baseUrl]
        if(Object.keys(shopCart.items).length > 0)
          return this.renderResult()
        else 
          return this.renderEmpty()
      }

    renderResult() {
        const allCarts = this.props.navigation.getScreenProps().allCarts
        const shop = this.props.navigation.getParam('shop', {}); 
        const items = allCarts[shop.baseUrl].items        
        const ids = Object.keys(items)
        return (
            <View style={styles.container}>
            <FlatList
              data={ids}          
              renderItem={({item}) => (
                <View style={styles.item}>          
                    <ProductImage source={items[item].image_source} />
                    <ProductTitle name={items[item].name} description_short={items[item].description_short}/>  
                    <CartEditProduct productId={item} shop={shop}/>
                </View>
              )}
              keyExtractor={item => item}
            />  
            </View> 
        )
    }

    renderEmpty() {
        return (      
        <View style={styles.loadingContainer}>
            <Text style={styles.titleText}>ПУСТО</Text>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'stretch'
       },
    item: {
      flex: 1,  
      padding: 5,
      flexDirection: 'row',
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'row',
        justifyContent: 'center',
     alignItems: 'center'
    },
    titleText: {
      color: '#333',
      fontSize: 18,
    },
  })

  export default withNavigation(ShoppingCart);