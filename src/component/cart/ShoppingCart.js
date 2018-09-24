import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class ShoppingCart extends React.Component {
    static navigationOptions = {    
        title: 'Корзина'    
    }

    constructor(props) {
        super(props);
        this.state = {
          products: []
        };         
      }

      render() {    
        const {products} = this.state
        if(!products)
          return this.renderResult()
        else 
          return this.renderEmpty()
      }

    renderResult() {
        const { products } = this.props;
        return (
          <View style={styles.container}> 
          {products.map ((item) => (
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
            <Text style={styles.priceText}>{parseInt(item.price)}</Text>
            <Text style={styles.priceText}>{(item.qty)}</Text>
          </View>
          ))}    
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
    loadingContainer: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'row',
        justifyContent: 'center',
     alignItems: 'center'
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