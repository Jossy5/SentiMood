import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'

///Importacion de Pantallas desde la crapeta screens 
import Principal from './screens/Principal'
import Prueba from './screens/Prueba'


const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={myDrawerOptions} >
      <Drawer.Screen name="Home" component={Principal} />
      <Drawer.Screen name="Profile" component={Prueba} />
    </Drawer.Navigator>
  );
}

export default function Navigator(){
    return(
        <NavigationContainer>
            <MyDrawer></MyDrawer>
        </NavigationContainer>
    );
}

const myDrawerOptions = {
  drawerStyle: {
    backgroundColor: '#9bd0bb',
    width: '70%', 
  },
  headerShown: false,
  drawerActiveTintColor: '#000',
  swipeEdgeWidth: screenWidth
};
