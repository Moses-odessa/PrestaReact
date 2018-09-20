import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FeaturesTable extends React.Component {
    render() {
        const { features } = this.props;
        const keys = Object.keys(features)
        console.log
        return (
            <View style={styles.container}> 
                          
            {keys.map ((key) => (
                <View key={key} style={styles.item}>
                    <Text style={styles.titleText}>{key}</Text>  
                    <View style={styles.values}> 
                        {features[key].map ((value, i) => (
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
    }
  })