import React from 'react';
import { Button, View, Text, FlatList, StyleSheet } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { getCategoriesByParentId } from './../../utils/PrestaService'

export default class Categories extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', ''),
    };
  }; 

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoading: true
    };         
  }

  componentDidMount() {
    const { navigation } = this.props;
    const parentCategoryId = navigation.getParam('parentCategoryId', 2);
    getCategoriesByParentId (parentCategoryId, (jsonData=>{
      console.log(jsonData)
      if(jsonData.length != 0){
        //jsonData.push({id: -1, name: [{value:'..'}]})
        this.setState({
          isLoading: false,
          categories: [].concat(jsonData)
        })
      }else{
        this.setState({
          isLoading: false,
        })
      }
    }))
  }

  render() {
    
    var {isLoading} = this.state
    if(isLoading)
      return this.renderLoadingMessage()
    else
      return this.renderResults()
  }

  renderLoadingMessage() {
    return (      
      <View style={styles.container}>
        <UIActivityIndicator color={'#fff'}
          size={60} />
        <Text style={{color: '#fff'}}>
          Data loading
        </Text>
      </View>
    )
  }

  renderResults() {   
    var {categories, isLoading} = this.state;
    if (!isLoading){
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item, id)=>item.key}
          renderItem={({item}) => 
          <View style={styles.lineView}>
            <Text 
            style={styles.item}
            onPress={() => {                 
              console.log(item.id) 
              if(item.id != -1){
                this.props.navigation.push('Categories', {                
                  parentCategoryId: item.id,
                  categoryName: item.name[0].value
                }) 
              }                     
            }}>
              {item.name[0].value}
            </Text>
            <Button
              title="Go to Products"
              onPress={() => {
                this.props.navigation.navigate('Products', {
                  categoryId: 86,
                  categoryName: item.name[0].value,
                })
              }}
            />
          </View>  
          }
        />
      </View>      
    )
    }
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  lineView: {
    flex: 1, 
    flexDirection: 'row',
  },
})