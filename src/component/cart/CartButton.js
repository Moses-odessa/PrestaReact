import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class CartButton extends React.Component {
    constructor(props) {
        super(props);                 
      }

    render() {           
        const allCarts = this.props.navigation.getScreenProps().allCarts
        const {shop} = this.props        
        if(!allCarts[shop.baseUrl]){
            allCarts[shop.baseUrl]= {
                items: {},
                qty: 0, 
                total: 0,}
        }
        const shopCart = allCarts[shop.baseUrl]
        return (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ShoppingCart', {shop: shop})              
            } }>
          <View style={styles.container}>
            <Icon name='shopping-cart'  style={styles.icon}/>  
            <View style={styles.textContainer}>
                <Text style={styles.label}>{shopCart.qty + ' ед.'}</Text>
                <Text style={styles.label}>{shopCart.total + ' $'}</Text>
            </View>
          </View>  
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({    
    container: { 
        flexDirection: 'row',
    },
    textContainer: { 
        flexDirection: 'column',
    },
    label: {
        fontSize: 12,
        color: '#fff'
    },
    icon: {
        fontSize: 36,
        color: '#fff'
    },
  })

  export default withNavigation(CartButton);