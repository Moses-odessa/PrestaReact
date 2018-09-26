import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class ProductBuy extends React.Component {
    render() {
        const { item } = this.props;
        return (          
            <View style={styles.buyContainer}>
                <Text style={styles.priceText}>{parseInt(item.price)}</Text>
                <Button title='В корзину' onPress={()=>{                      
                    const updateCart =this.props.navigation.getScreenProps().updateCart 
                    let cartProducts =this.props.navigation.getScreenProps().cartProducts 
                    cartProducts.qty++ 
                    cartProducts.total+=parseInt(item.price)
                    if(!cartProducts.items[item.id]) {
                        let cartItem = item
                        cartItem.qty = 1
                        cartProducts.items[item.id] = cartItem                             
                    } else {
                        cartProducts.items[item.id].qty++
                    }                                         
                    updateCart(cartProducts)
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