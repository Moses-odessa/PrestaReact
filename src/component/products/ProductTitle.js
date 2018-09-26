import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProductTitle extends React.Component {
    render() {
        const { name, description_short } = this.props;
        return (          
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{name}</Text>
                <Text style={styles.descriptionText}>
                    {description_short.replace(/<(.|\n)*?>/g, '')}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({    
    textContainer: {
        flex: 3,
        padding: 2,
        flexDirection: 'column'
    },    
    titleText: {
      color: '#333',
      fontSize: 16,
    },
    descriptionText: {
        color: '#333',
        fontSize: 12,
    },
  })