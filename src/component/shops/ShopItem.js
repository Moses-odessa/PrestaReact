import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class ShopItem extends React.Component {
    render() {
        const { item, navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Categories', {
                shop: item
            });
          }}>
          <View style={styles.item}>          
            <Text>{item.baseUrl}</Text>    
          </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      flex: 1,  
      padding: 5,
      flexDirection: 'row',
    },
  })

  export default withNavigation(ShopItem);