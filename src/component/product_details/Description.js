import React from 'react';
import { View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import {UIActivityIndicator} from 'react-native-indicators';
import { getProductDescription } from './../../utils/PrestaService'

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          productDescription: '',      
          loading: true
        };         
      }
    
      componentDidMount() {
        const { productId } = this.props;
        getProductDescription (productId, (jsonData=>{
            let productDescription = jsonData    
            this.setState({
              loading: false,
              productDescription: productDescription
            })      
        }))
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
        let { productDescription } = this.state;  
        if(productDescription.length == 0) productDescription='НЕТ ОПИСАНИЯ'
        return (
          <View style={styles.textContainer}>
               <HTMLView value={productDescription}/>  
          </View>  
        )
    }
}

const styles = StyleSheet.create({    
    textContainer: {  
        marginTop: 20,      
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aaf',
        borderRadius:10,
        borderWidth: 0,
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

  })