import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import MyNumberPicker from './number_picker/MyNumberPicker';

class CartEditProduct extends React.Component {   

    render() {           
        const cartProducts =this.props.navigation.getScreenProps().cartProducts
        const {productId} = this.props
        return (          
          <View style={styles.container}>   
                <MyNumberPicker
                    value={cartProducts.items[productId].qty}
                    min={1}
                    max={10}
                    stepsize={1}
                    onChangeText={(value) => {
                        const updateCart =this.props.navigation.getScreenProps().updateCart 
                        let cartProducts =this.props.navigation.getScreenProps().cartProducts 
                        let delta = value - cartProducts.items[productId].qty
                        cartProducts.qty+= delta
                        cartProducts.total+=parseInt(cartProducts.items[productId].price)*delta
                        cartProducts.items[productId].qty = value                                        
                        updateCart(cartProducts)

                    }}
                />         
            <View style={styles.textContainer}>
                <Text style={styles.priceText}>{parseFloat(cartProducts.items[productId].price)}</Text>
            </View>             
            <TouchableOpacity onPress={() => {           
                const updateCart =this.props.navigation.getScreenProps().updateCart 
                let cartProducts =this.props.navigation.getScreenProps().cartProducts 
                cartProducts.qty-= cartProducts.items[productId].qty
                cartProducts.total-=parseInt(cartProducts.items[productId].price)*cartProducts.items[productId].qty
                delete cartProducts.items[productId]                                        
                updateCart(cartProducts)  
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