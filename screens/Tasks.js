import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class Tasks extends React.Component {
  constructor(){
    super();
    this.state ={
      allTasks:[],
      dataSource:[],
      search : '',
    }
  }

  componentDidMount(){
    this.retrieveTasks()
  }

  updateSearch = search =>{
    this.setState({
      search
    })
  }

  retrieveTasks =()=>{
    try {
      var allTasks = [];
      var tasks = db.collection('Tasks').get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          allTasks.push(doc.data());
          console.log('These are all the tasks', allTasks);
        })
        this.setState({
          allTasks
        })
      })
    }
    catch (error){
      console.log(error)
    }
  }

  searchFilterFunction(text){
    const newData = this.state.allTasks.filter((item)=>{
      const itemData = item.title ? item.title.toUpperCase(): ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData)> -1;
    })
    this.setState({
      dataSource: newData,
      search: text,
    })
  }

  render(){
    return(
      <View style = {styles.container}>

        <FlatList
          data={this.state.search=== ''? this.state.allTasks: this.state.dataSource}
          renderItem={({item}) => (
            <View style={styles.itemcontainer}>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Description: {item.description}</Text>
            </View>
          )}
          keyExtractor={(item,index) => index.toString()}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  itemcontainer : {
    height: 80,
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10
  },
  text: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#3C345C'
  }
})