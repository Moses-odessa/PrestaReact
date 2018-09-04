import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupsJSON: [],
      isLoading: true
    };
  }

  fetchGroupsJSON() {
    var url = 'http://homey.in.ua/api/categories/?output_format=JSON&display=[id,name,id_parent]';
    fetch(url,
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa('CM67C92UKYFPE2U7837YH4HGDBV78FBH:'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body: ''
      })
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData);
        this.setState({isLoading: false});
      })
	.catch( error => console.log('Fetch error ' + error) );
  }

  componentDidMount() {
    this.fetchGroupsJSON();
  }

  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  renderLoadingMessage() {
    return (
      
  <View style={styles.loadingContainer}>
        <UIActivityIndicator color={'#fff'}
          size={60} />
        <Text style={color={'#fff'}}>
          Data loading
        </Text>
   </View>
    );
  }

  renderResults() {
    return (
      
  <View style={styles.loadingContainer}>
        <Text style={color={'#fff'}}>
          Data loaded
        </Text>
       
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
    },
loadingIndicator: {
}
});
