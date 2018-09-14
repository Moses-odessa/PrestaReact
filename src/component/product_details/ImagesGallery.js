import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import {UIActivityIndicator} from 'react-native-indicators';
import { getImageURL, AUTHORIZATION, getProductById, getImageURLWithAuth } from './../../utils/PrestaService'

export default class ImagesGallery extends React.Component {
  static navigationOptions = {    
    title: 'Изображения'    
  }
  images = []

  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},      
      loadingProductDetail: true
    };         
  }

  loadUrl(productDetails) {
    let images = []
    for(let i = 0; i < productDetails.associations.images.length; i++){
      let item = {}
      item.id = '' + productDetails.associations.images[i].id
      item.source = {}
      item.source.uri = getImageURL(productDetails.id, productDetails.associations.images[i].id, 'large_default')
      item.source.headers = {
            'Authorization': AUTHORIZATION, 
            'Content-Type': 'data:image/jpg'
        }
      item.source.method = 'get'
      //console.log(item) 
      images.push(item)
    }
    return images
  }

  componentDidMount() {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId', 1);
    getProductById (productId, (jsonData=>{
        let productDetails = jsonData 
        this.images = this.loadUrl(productDetails)    
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
    const ids = productDetails.associations.images 
    
    return (
      <View style={styles.container}>      
        <ImageCarousel zoomEnable={true}
        renderContent={(id)=>(
          <Image style={StyleSheet.absoluteFill} resizeMode='contain'
              source={this.images[id].source}
            />
        )}
        >
        {ids.map ( (image) => (
        <Image key={image.id} style={styles.image}
              source={
                { 
                uri: getImageURL(productDetails.id, image.id, 'medium_default'),
                headers: {
                    'Authorization': AUTHORIZATION, 
                    'Content-Type': 'data:image/jpg'
                },
                method: 'get'
                }
              }
            />
            ))}
        
        </ImageCarousel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   justifyContent: 'center',
   alignItems: 'center',
  },  
  image: {
    marginRight: 2,
    width: 200,
    height: 200,
    resizeMode: 'contain',
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