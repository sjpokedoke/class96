import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AddTasks from './screens/AddTasks';
import Tasks from './screens/Tasks';
import Feedback from './screens/Feedback';
import MyHeader from './components/MyHeader'

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <MyHeader/>
        <AppContainer/>
      </View> 
    ) 
  } 
}

const TabNavigator = createBottomTabNavigator({ 
  'Tasks': {screen: Tasks},
  'AddTasks': {screen: AddTasks},
  'Feedback': {screen: Feedback},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName
        if (routeName === 'Tasks'){
          return(
            <Image source={require('./assets/Tasks.png')} style={{width:30, height:30}} />
          )

        } else if(routeName === 'AddTasks'){
          return(
            <Image source={require('./assets/AddTasks.png')} style={{width:30, height:30}}/>
          )
        } else if(routeName === 'Feedback'){
          return(
            <Image source={require('./assets/Feedback.png')} style={{width: 30, height: 30}}/>
          )
        }
      },
      tabBarOptions:{
        style: {
          backgroundColor: '#CCD5E0',
        }
      }
    })
  }
  )
const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99A8BB'
  },
})