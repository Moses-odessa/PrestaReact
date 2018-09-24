import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class ProductsItem extends React.Component {
    render() {
        const { item, navigation } = this.props;
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('DetailsStack', {
              productId: item.id,
              productName: item.name,
            });
          }}>
          <View style={styles.item}>          
            <Image style={styles.images}
              source={item.image_source}
            />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.descriptionText}>
                    {item.description_short.replace(/<(.|\n)*?>/g, '')}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.priceText}>{parseInt(item.price)}</Text>
                <Button title='В корзину' onPress={()=>{alert('OK')}}/>
            </View>    
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