
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';


export default class MyNumberPicker extends Component {
    render() {
    return (
        <View style={styles.verticle}>
          <TouchableHighlight underlayColor={'#999999'} onPress={this.upBtnPressed.bind(this)} style={styles.button}>
            <Image source={require('./up.png')} style={styles.image}/>
          </TouchableHighlight>

        <Text style={styles.textQty}>{this.props.value}</Text>

          <TouchableHighlight underlayColor={'#999999'} onPress={this.downBtnPressed.bind(this)} style={styles.button}>
            <Image source={require('./down.png')}  style={styles.image}/>
          </TouchableHighlight>
        </View>
    )
  }

  upBtnPressed () {
    if(this.props.value != this.props.max){
      let value = this.props.value + this.props.stepsize;
      this.props.onChangeText(value);
    }
  }

  downBtnPressed() {
    if(this.props.value != this.props.min){
      let value = this.props.value - this.props.stepsize;
      this.props.onChangeText(value);
    }
  }
}


const styles = StyleSheet.create({  
  verticle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQty: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#dedede',
    padding: 5
  },
  image: {
    width: 18,
    height: 18
  }
})