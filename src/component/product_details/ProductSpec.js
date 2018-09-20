import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductDescription, getProductFeatures } from './../../utils/PrestaService'
import FeaturesTable from './FeaturesTable';

export default class ProductSpec extends React.Component {
  static navigationOptions = {    
    title: 'Спецификации'    
  }

  constructor(props) {
    super(props);
    this.state = {
      productFeatures: {},      
      loadingProductFeatures: true
    };         
  }

  componentDidMount() {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId', 1);
    getProductFeatures (productId, (jsonData=>{
        let productFeatures = jsonData 
        //console.log(productFeatures)      
        this.setState({
          loadingProductFeatures: false,
          productFeatures: productFeatures
        })      
    }))
  }

  render() {    
    const {loadingProductFeatures} = this.state
    if(loadingProductFeatures)
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
    const {productFeatures} = this.state   
    return (
      <ScrollView>    
        <View style={styles.container}>
        <Text style={styles.titleText}>СПЕЦИФИКАЦИИ</Text>      
        <FeaturesTable features={productFeatures} />   
        </View>   
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   justifyContent: 'center',
   alignItems: 'center',
  },
  item: {
    flex: 1,  
    padding: 5,
    height: 100,
    flexDirection: 'row',
  },  
  titleText: {
    color: '#333',
    fontSize: 18,
  },
  loadingContainer: {
      flex: 1,
      paddingTop: 22,
      flexDirection: 'row',
      justifyContent: 'center',
   alignItems: 'center'
  },
  priceText: {
    color: '#f00',
    fontSize: 24,
  },
})