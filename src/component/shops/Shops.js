import React from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getLangTitle } from '../../utils/LangService';
import ShopItem from './ShopItem';

export default class Shops extends React.Component {
  static navigationOptions = {    
      title: getLangTitle('RU', 'Select Shop')    
  }

  constructor(props) {
    super(props);
    this.state = {
      shops: {},
      loading: true
    };         
  }
  
  loadShops = async()=> {
    const defaultShops = {
        'https://koreashop.com.ua/api/': {
            baseUrl: 'https://koreashop.com.ua/api/',
            authKey: 'PYIXFN6JSMX7JC892BT8ZAFWPIFRU7W8',
            lang: {id:1, title:'RU'}
        },
        'http://homey.in.ua/api/': {
            baseUrl: 'http://homey.in.ua/api/',
            authKey: 'CM67C92UKYFPE2U7837YH4HGDBV78FBH',
            lang: {id:1, title:'RU'}
        },
    }
    let shops = {};
    try {
      shops = await AsyncStorage.getItem('shops') || defaultShops;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      shops = {}
    }  
    this.setState({
        loading: false,
        shops: shops
    })
  }
  
  componentDidMount() {
    this.loadShops()
        
  }

  render() {    
    const {loading} = this.state
    if(loading)
      return this.renderLoadingMessage()
    else
      return this.renderResults()
  }

  renderLoadingMessage() {
    return (      
      <View style={styles.loadingContainer}>
        <UIActivityIndicator color={'#f00'} size={60} />        
      </View>
    )
  }

  renderResults() {   
    const {shops} = this.state    
    const keys = Object.keys(shops)  
    //console.log(shops)    
    return (
      <ScrollView>
          {keys.map ((key) => (
                <ShopItem key={key} item={shops[key]}/>
            ))}
      </ScrollView>                
    )    
  }

}


const styles = StyleSheet.create({   
  loadingContainer: {
      flex: 1,
      paddingTop: 22,
      flexDirection: 'row',
  }
})