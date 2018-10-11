import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getCategories } from './../../utils/PrestaService'
import { getLangTitle } from '../../utils/LangService';
import CartButton from '../cart/CartButton';

export default class Categories extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: getLangTitle('RU', 'Select Category'),
      headerRight: (<CartButton shop={navigation.getParam('shop', {})}/>),  
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      children: {},
      collapsed: {},
      loadingCategories: true
    };         
  }

  componentDidMount() {
    const rootCategoryId = 0;
    const shop = this.props.navigation.getParam('shop', {});
    //console.log(shop)
    getCategories (shop, (jsonData=>{
        let categories = []
        let children = {}
        for(let i = 0; i < jsonData.length; i++){
          let node = jsonData[i]
          node.id_parent == rootCategoryId && categories.push(node);
          (!!node.id_parent && !children[node.id_parent]) && (children[node.id_parent] = []);
          !!node.id_parent && children[node.id_parent].push(node);
        }
        this.setState({
          loadingCategories: false,
          categories: categories,
          children: children
        })      
    }))
  }

  render() {    
    const {loadingCategories} = this.state
    if(loadingCategories)
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
    const {categories} = this.state          
    return (
      <ScrollView>{this._getNode(0, categories)}</ScrollView>                
    )    
  }

  _getNode(level, root) {
    const {collapsed} = this.state
    const {children} = this.state    

    let allNodes = root.map((node, index) => {
      return (
        <View key = {index} style={{paddingLeft: level*10}} >            
          {this._getNodeView(node)}           
          {
            (!!collapsed[node.id] && !!children[node.id] && children[node.id].length > 0) ?
            this._getNode(level + 1, children[node.id]) : null
          }           
        </View>
    )
    })

    return allNodes
}

_getNodeView(node) {
  const {collapsed} = this.state
  const icon = collapsed[node.id] ? 'chevron-right' : 'keyboard-arrow-down'  
  const shop = this.props.navigation.getParam('shop', {});
  return (
      <View style={styles.item}>
          <Icon style={styles.icon} name={icon} onPress={() => this._toggleState.bind(this)(node.id)}/>
          <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Products', {
                 categoryId: node.id,
                 categoryName: node.name,
                 shop: shop,
                 //cartQty: this.props.navigation.getParam('cartQty',0),
                 //cartTotal: this.props.navigation.getParam('cartTotal',0)
              });
            }}>
           <Text style={styles.titleText} > 
            {node.name} 
           </Text>
          </TouchableOpacity>
      </View>
  )
}

_toggleState(id) {
  const {collapsed} = this.state
  collapsed[id] = !collapsed[id]
  this.setState({
      collapsed: collapsed
  })
}

}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    height: 44,
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 10,
    color: '#333',
    alignSelf: 'center',
    fontSize: 36
  },
  titleText: {
    color: '#333',
    fontSize: 18,
  },  
  loadingContainer: {
      flex: 1,
      paddingTop: 22,
      flexDirection: 'row',
  }
})