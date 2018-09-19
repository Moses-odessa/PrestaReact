import React from 'react';
import { View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class Description extends React.Component {
    render() {
        let { html } = this.props;  
        if(html.length == 0) html='НЕТ ОПИСАНИЯ'
        return (
          <View style={styles.textContainer}>
               <HTMLView value={html}/>  
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
        borderWidth: 1,
    },
    h1: {
      color: '#333',
      fontSize: 18,
    },
    h2: {
        color: '#333',
        fontSize: 12,
    },

  })