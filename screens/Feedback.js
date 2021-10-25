import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Modal, ScrollView, KeyboardAvoidingView, Alert, Switch, Appearance, useColorScheme } from 'react-native';
import  db from '../config';
import firebase from 'firebase';
import { Rating } from 'react-native-elements'

export default class Feedback extends React.Component {
  constructor(){
    super();
    this.state = {
      feedback: '',
      rate: '',
      isEnabled: '',
    }
  }

  addFeedback=()=>{
    if (this.state.feedback==''){
      alert('Please fill out all fields')
    } else { 
      db.collection('Feedback').add({
        feedback: this.state.feedback,
        rate: this.state.rate,
      })
      return alert('Thank you for your feedback')
    }
  }

  ratingCompleted=(rating)=>{
    this.setState({
      rate: rating,
    })
    console.log(this.state.rate)
  }

  componentDidMount(){
    db.collection('Theme').get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var theme = doc.data();
        this.setState({
          isEnabled: theme.isEnabled
        })
      })
    })
  }

  toggleSwitch=()=>{
    this.setState({
      isEnabled: !this.state.isEnabled,
    })
    db.collection('Theme').update({
      'isEnabled': !this.state.isEnabled
    })
  }
  
  render(){
    const colorScheme = this.state.isEnabled;
    const themeContainerStyle = colorScheme === false ? styles.container : styles.darkContainer;

    return(
        <View style={[styles.container, themeContainerStyle]}>
          <View style={styles.formcontainer}>
          
            <TextInput style={styles.formtextinput} placeholder={'How is your experience with this app'} 
              onChangeText={(text)=>{
                this.setState({feedback: text})
              }} value={this.state.feedback} multiline
            />

            <View>
              <Text style={styles.starttext}>Rate this app!</Text>
              <Rating
              ratingColor='#FFA738'
              ratingBackgroundColor='#99A8BB'
              ratingCount={5}
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>{
              this.addFeedback()
              this.setState({feedback:''})
            }}>
              <Text style={styles.buttontext}>Submit</Text>
            </TouchableOpacity>

            <View>
              <View>
                <Text style={styles.lighttext}>Light</Text>
              </View>

              <Switch
                trackColor={{false: '#7C9DF2', true: '#32373E'}}
                onValueChange={this.toggleSwitch}
                value={this.state.isEnabled}
              />

              <View>
                <Text style={styles.darktext}>Dark</Text>
              </View>
            </View>

          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99A8BB'
  },
  formcontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  starttext: {
    fontSize: 15, 
    color: 'black',
    marginLeft: 20,
    padding: 10,
    fontFamily: 'monospace',
  },
  formtextinput: {
    width: '75%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderColor: 'black',
    fontFamily: 'monospace',
    color: 'black',
  },
  button: {
    backgroundColor: '#4E6190',
    width: 300,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10,
    elevation: 16,
  },
  buttontext: {
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 20,
  },
  darkContainer:{
    backgroundColor: '#1E314A'
  },
  lighttext: {
    marginBottom: -20,
    marginLeft: -50,
    fontFamily: 'monospace',
  },
  darktext: {
    marginTop: -20,
    marginRight: -100,
    marginLeft: 50,
    fontFamily: 'monospace',
  },
})