import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductDescription } from './../../utils/PrestaService'
import Description from './Description';
import ProductTitle from '../products/ProductTitle';
import ProductBuy from '../products/ProductBuy';
import ProductImage from '../products/ProductImage';

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
          <ProductImage source={productDetails.image_source}/>
          <ProductTitle name={productDetails.name} description_short={productDetails.description_short}/>
          <ProductBuy item={productDetails}/>
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
  loadingContainer: {
      flex: 1,
      paddingTop: 22,
      flexDirection: 'row',
      justifyContent: 'center',
   alignItems: 'center'
  },
})