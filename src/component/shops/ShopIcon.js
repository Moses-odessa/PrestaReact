import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { getShopLogo } from '../../utils/PrestaService';

export default class ShopIcon extends React.Component {
    
    render() {
        const {shop} = this.props
        //console.log(getShopLogo(shop))
        return (                   
            <Image style={styles.images}
              resizeMode={'contain'}
              source={getShopLogo(shop)}
            />            
        )
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    images: {
        flex: 1,
        alignSelf: 'stretch',
        width: (win.width-30)*3/4,
        height: 50,
    }
});