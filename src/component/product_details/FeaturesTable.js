import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductFeatures } from './../../utils/PrestaService'

export default class FeaturesTable extends React.Component {
    

  constructor(props) {
    super(props);
    this.state = {
      productFeatures: {},      
      loadingProductFeatures: true
    };         
  }

  componentDidMount() {
    const { productId } = this.props;
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
        const { productFeatures } = this.state;
        const keys = Object.keys(productFeatures)
        console.log
        return (
          <View style={styles.container}>                           
            <Text style={styles.titleText}>СПЕЦИФИКАЦИИ</Text>
            {keys.map ((key) => (
                <View key={key} style={styles.item}>
                    <Text style={styles.titleText}>{key}</Text>  
                    <View style={styles.values}> 
                        {productFeatures[key].map ((value, i) => (
                            <Text key={i} style={styles.titleText}>{value}</Text>   
                        ))}
                    </View>
                </View>
            ))}
          </View>                      
        )
    }
}

const styles = StyleSheet.create({
    container: {     
     padding: 10,
     justifyContent: 'center',
     alignItems: 'center',
     alignSelf: 'stretch',
     backgroundColor: '#ddd',
     borderRadius:5,
     borderWidth: 0,
    },
    values: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#aaf',
        borderRadius:5,
        borderWidth: 0,
       },
    item: {  
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
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