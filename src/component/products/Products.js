import React from 'react';
import { Text, FlatList, View, StyleSheet, } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductsByCategoryId } from './../../utils/PrestaService'
import ProductItem from '../products/ProductItem'

export default class Products extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', ''),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [],      
      loadingProducts: true
    };         
  }

  componentDidMount() {
    const { navigation } = this.props;
    const categoryId = navigation.getParam('categoryId', 1);
    const shop = navigation.getParam('shop', {});
    getProductsByCategoryId (shop, categoryId, (jsonData=>{
        let products = jsonData       
        this.setState({
          loadingProducts: false,
          products: products
        })      
    }))
  }

  render() {    
    const {loadingProducts, products} = this.state
    if(loadingProducts)
      return this.renderLoadingMessage()
    else if(products.length==0)
      return this.renderEmptyCategory()
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

  renderEmptyCategory() {
    return (      
      <View style={styles.loadingContainer}>
        <Text style={styles.titleText}>ПУСТО</Text>
      </View>
    )
  }

  renderResults() {   
    let {products} = this.state   
    return (
      <View style={styles.container}>
        <FlatList
          data={products}          
          renderItem={({item}) => <ProductItem item={item} navigation={this.props.navigation}/>}
          keyExtractor={item => '' + item.id}
        />
      </View>                
    )    
  }
}
  
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   justifyContent: 'center',
   alignItems: 'stretch'
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
  }
})