import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class AddTasks extends React.Component {
  constructor(){
    super();
    this.state = {
      name:'',
      date:'',
      description:'',
      submitStatus: null,
    }
  }

  addTask = async()=>{
    if (this.state.name===''||this.state.date===''||this.state.description===''){
      alert('Please fill out all fields')
    } else {
      db.collection('Tasks').add({
        'name': this.state.name,
        'date': this.state.date,
        'description': this.state.description,
        'submitStatus': this.state.submitStatus,
      })
      this.setState({submitStatus:true})
      alert('Task added')
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style = {styles.container} behavior = 'padding' enables>
        <TextInput style={styles.textinput} placeholder = 'Task name' onChangeText={(name)=>{
          this.setState({name: name})
        }} value = {this.state.name}
        />

        <TextInput style={styles.textinput} placeholder = 'Task date (dd/mm/yyyy)' onChangeText={(date)=>{
          this.setState({date: date})
        }} value = {this.state.date}
        />

        <TextInput style={styles.description} placeholder = 'Task description' multiline={true}
        onChangeText={(description)=>{
          this.setState({description: description})
        }}
        value = {this.state.description}/>

        <TouchableOpacity style = {styles.addbutton} onPress={()=>{
          this.addTask()
          this.setState({
            name: '',
            date: '',
            description: '',
            submitStatus: null
          })
        }}>
          <Text style = {styles.addtext}>Add</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99A8BB'
  },
  textinput: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    fontFamily: 'monospace',
    color: 'black',
  },
  description: {
    width: 300,
    height: 250,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    fontFamily: 'monospace',
    color: 'black',
  },
  addbutton: {
    width: '50%',
    height: 40,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 20,
    fontFamily: 'monospace',
    color: 'black',
  },
  addtext: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'monospace'
  },
})