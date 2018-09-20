import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FeaturesTable extends React.Component {
    render() {
        const { features, title } = this.props;
        const keys = Object.keys(features)
        console.log
        return (
            <View style={styles.container}> 
                          
            {keys.map ((key) => (
                <View style={styles.item}>
                    <Text key={key} style={styles.titleText}>{key}</Text>  
                    <View key={'v' + key} style={styles.values}> 
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
     flex: 1,
     padding: 10,
     justifyContent: 'center',
     alignItems: 'center',
    },
    values: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aaf',
           borderRadius:5,
           borderWidth: 0,
       },
    item: {
      flex: 1,  
      padding: 5,
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },  
    titleText: {
      color: '#333',
      fontSize: 18,
    }
  })