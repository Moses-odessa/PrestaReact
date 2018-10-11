import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import ShopIcon from './ShopIcon';
import CartButton from '../cart/CartButton'
import EditRemoveButton from './EditRemoveButton';

class ShopItem extends React.Component {
    render() {
        const { item, navigation } = this.props;
        //console.log(item)
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Categories', {
            shop: item
          });
          }}>
          <View style={styles.container}>
          <View style={styles.titleBox}>   
            <ShopIcon shop={item}/>       
            <Text>{item.baseUrl}</Text>    
          </View>
          <View style={styles.buttonBox}>   
            <CartButton shop={item}/>
            <EditRemoveButton shop={item}/>
          </View>
          </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    titleBox: {
      flex: 3,  
      padding: 5,
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
    },
    horizontalSpace: {
      height: 10
    },
    buttonBox: {
      flex: 1,  
      padding: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container: {
      flex: 1,  
      padding: 10,
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius:10,
      borderWidth: 0,
      marginTop: 10,
    },
  })

  export default withNavigation(ShopItem);