'use strict';
 
import React, { Component, StyleSheet } from 'react';
import { AppRegistry, View, Text } from 'react-native';


  export class CategoriesPage extends Component {
    constructor(props) {
      super(props);      
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Search for houses to buy!
          </Text>
          <Text style={styles.description}>
            Search by place-name, postcode or search near your location.
          </Text>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('prestareact', () => CategoriesPage)
  
  const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      color: '#000',
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    }
  });