import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet } from 'react-native';

export default class CartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          qty: 0,
          total: 0
        };         
      }

    render() {    
        const {qty, total} = this.state    
        return (
          <View style={styles.container}>
            <Icon name='shopping-cart'  style={styles.icon}/>  
            <View style={styles.textContainer}>
                <Text style={styles.label}>{qty + ' ед.'}</Text>
                <Text style={styles.label}>{total + ' $'}</Text>
            </View>
          </View>  
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