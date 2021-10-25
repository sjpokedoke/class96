import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class MyHeader extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Check, Check, Check</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4E6190'
  },
  text:{
    color: '#3C345C',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace'
  }
});