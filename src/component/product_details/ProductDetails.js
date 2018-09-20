import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductDescription } from './../../utils/PrestaService'
import Description from './Description';

export default class ProductDetails extends React.Component {
  static navigationOptions = {    
    title: 'Описание'    
  }

  constructor(props) {
    super(props);
    this.state = {
      productDetail: {},      
      loadingProductDetail: true
    };         
  }

  componentDidMount() {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId', 1);
    getProductDescription (productId, (jsonData=>{
        let productDetails = jsonData 
        //console.log(productDetails)      
        this.setState({
          loadingProductDetail: false,
          productDetails: productDetails
        })      
    }))
  }

  render() {    
    const {loadingProductDetail} = this.state
    if(loadingProductDetail)
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
    const {productDetails} = this.state
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>{productDetails.name}</Text> 
        <Text style={styles.descriptionText}>{productDetails.description_short.replace(/<(.|\n)*?>/g, '')}</Text> 
        <Text style={styles.priceText}>{parseInt(productDetails.price)}</Text>
        <Button title='В корзину' onPress={()=>{alert('OK')}}/>
        <Description html={productDetails.description}/>      
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
  titleText: {
    color: '#333',
    fontSize: 18,
  },
  descriptionText: {
    color: '#333',
    fontSize: 12,
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