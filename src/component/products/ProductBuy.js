import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class ProductBuy extends React.Component {
    render() {
        const { item, shop } = this.props;
        return (          
            <View style={styles.buyContainer}>
                <Text style={styles.priceText}>{parseFloat(item.price)}</Text>
                <Button title='В корзину' onPress={()=>{                      
                    const updateCart =this.props.navigation.getScreenProps().updateCart 
                    let shopCart =this.props.navigation.getScreenProps().allCarts[shop.baseUrl] 
                    shopCart.qty++ 
                    shopCart.total+=parseFloat(item.price)
                    if(!shopCart.items[item.id]) {
                        let cartItem = item
                        cartItem.qty = 1
                        cartItem.price = parseFloat(item.price)
                        shopCart.items[item.id] = cartItem                             
                    } else {
                        shopCart.items[item.id].qty++
                    }                                         
                    updateCart(shop, shopCart)
                    }}/>
            </View>    
        )
    }
}

const styles = StyleSheet.create({    
    buyContainer: {
        flex: 1,
        padding: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        color: '#f00',
        fontSize: 24,
    },
  })

  export default withNavigation(ProductBuy);