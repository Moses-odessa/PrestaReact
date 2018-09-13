import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getImageURL, AUTHORIZATION } from './../../utils/PrestaService'

export default class ProductsItem extends React.Component {
    render() {
        const { item, navigation } = this.props;
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails', {
              productId: item.id,
              productName: item.name[0].value,
            });
          }}>
          <View style={styles.item}>          
            <Image style={styles.images}
              source={
                { 
                uri: getImageURL(item.id, item.id_default_image, 'cart_default'),
                headers: {
                    'Authorization': AUTHORIZATION, 
                    'Content-Type': 'data:image/jpg'
                },
                method: 'get'
                }
              }
            />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.name[0].value}</Text>
                <Text style={styles.descriptionText}>
                    {item.description_short[0].value.replace(/<(.|\n)*?>/g, '')}
                </Text>
            </View>  
            <Text style={styles.priceText}>{parseInt(item.price)}</Text>
          </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      flex: 1,  
      padding: 5,
      height: 100,
      flexDirection: 'row',
    },
    textContainer: {
        flex: 3,
        padding: 2,
        flexDirection: 'column'
    },
    images: {
        width: 100, 
        height: 100
    },
    titleText: {
      color: '#333',
      fontSize: 18,
    },
    descriptionText: {
        color: '#333',
        fontSize: 12,
    },
    priceText: {
        color: '#f00',
        fontSize: 24,
    },

  })