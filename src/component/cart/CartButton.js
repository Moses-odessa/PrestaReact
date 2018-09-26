import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class CartButton extends React.Component {
    constructor(props) {
        super(props);                 
      }

    render() {           
        const cartProducts =this.props.navigation.getScreenProps().cartProducts
        return (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ShoppingCart')              
            } }>
          <View style={styles.container}>
            <Icon name='shopping-cart'  style={styles.icon}/>  
            <View style={styles.textContainer}>
                <Text style={styles.label}>{cartProducts.qty + ' ед.'}</Text>
                <Text style={styles.label}>{cartProducts.total + ' $'}</Text>
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