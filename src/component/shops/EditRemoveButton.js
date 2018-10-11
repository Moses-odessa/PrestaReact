import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class EditRemoveButton extends React.Component {   

    render() {           
        const {shop} = this.props
        return (          
          <View style={styles.container}>                
            <TouchableOpacity onPress={() => {           
                
            }}>
                <Icon name='settings'  style={styles.iconEdit}/>  
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => {           
                
            }}>
                <Icon name='delete'  style={styles.iconRemove}/>  
            </TouchableOpacity>   
            
          </View>
        )
    }
}

const styles = StyleSheet.create({    
    container: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconEdit: {
        fontSize: 36,
        color: '#33a'
    },
    iconRemove: {
        fontSize: 36,
        color: '#a33'
    },
  })

  export default withNavigation(EditRemoveButton);