import React from 'react';
import { Button, View, Text, FlatList, StyleSheet } from 'react-native';
import { getCategoriesByParentId } from './../utils/PrestaService'

export default class Categories extends React.Component {
  static navigationOptions = {
    title: 'Categories ',
  };

  constructor(props) {
    super(props);
    this.state = {parentCategoryId: 0};    
  }

  render() {
    let categories = getCategoriesByParentId (0)
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => 
          <View>
            <Text style={styles.item}>{item.key}</Text>
            <Button
              title="Go to Products"
              onPress={() => {
                this.props.navigation.navigate('Products', {
                  categoryId: 86,
                  categoryName: item.key,
                });
              }}
            />
          </View>  
          }
        />
      </View>      
    );
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
})