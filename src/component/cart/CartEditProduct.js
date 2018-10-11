import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import MyNumberPicker from './number_picker/MyNumberPicker';

class CartEditProduct extends React.Component {   

    render() {           
        const allCarts =this.props.navigation.getScreenProps().allCarts
        const {productId, shop} = this.props
        const shopCart = allCarts[shop.baseUrl]
        return (          
          <View style={styles.container}>   
                <MyNumberPicker
                    value={shopCart.items[productId].qty}
                    min={1}
                    max={10}
                    stepsize={1}
                    onChangeText={(value) => {
                        const updateCart =this.props.navigation.getScreenProps().updateCart 
                        let shopCart =this.props.navigation.getScreenProps().allCarts[shop.baseUrl] 
                        let delta = value - shopCart.items[productId].qty
                        shopCart.qty+= delta
                        shopCart.total+=parseFloat(cartProducts.items[productId].price)*delta
                        shopCart.items[productId].qty = value                                        
                        updateCart(shop, shopCart)

                    }}
                />         
            <View style={styles.textContainer}>
                <Text style={styles.priceText}>{parseFloat(shopCart.items[productId].price)}</Text>
            </View>             
            <TouchableOpacity onPress={() => {           
                const updateCart =this.props.navigation.getScreenProps().updateCart 
                let shopCart =this.props.navigation.getScreenProps().allCarts[shop.baseUrl] 
                shopCart.qty-= shopCart.items[productId].qty
                shopCart.total-=parseFloat(shopCart.items[productId].price)*shopCart.items[productId].qty
                delete shopCart.items[productId]                                        
                updateCart(shop, shopCart)  
            }}>
                <Icon name='delete'  style={styles.icon}/>  
            </TouchableOpacity>   
            
          </View>
        )
    }
}

const styles = StyleSheet.create({    
    container: { 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: { 
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 18,
        color: '#f00'
    },
    label: {
        fontSize: 12,
        color: '#000'
    },
    icon: {
        fontSize: 36,
        color: '#fff'
    },
  })

  export default withNavigation(CartEditProduct);