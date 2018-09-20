import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import ImageZoom from 'react-native-image-pan-zoom';
import { UIActivityIndicator } from 'react-native-indicators';
import { getProductImages } from '../../utils/PrestaService'

export default class ImagesGallery extends React.Component {
  static navigationOptions = {    
    title: 'Изображения'    
  }

  constructor(props) {
    super(props);
    this.state = {
      images: [],      
      loadingProductDetail: true
    };         
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId', 1);
    getProductImages (productId, (jsonData=>{   
        this.setState({
          loadingProductDetail: false,
          images: jsonData
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
    const {images} = this.state     
    return (
      <View style={styles.container}>      
        <ImageCarousel zoomEnable={true}
        renderContent={(id)=>(
          <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={200}
                       imageHeight={200}>
            <Image style={StyleSheet.absoluteFill} resizeMode='contain'
              source={images[id].large_source}
            />
          </ImageZoom>  
        )}
        >
        {images.map ( (image) => (
        <Image key={image.id} style={styles.image}
              source={image.preview_source}
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
   flexDirection: 'column',
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