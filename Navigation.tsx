import React from 'react'
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

///Importacion de Pantallas desde la carpeta screens
import Principal from './screens/Principal'
import Prueba from './screens/Prueba'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={myDrawerOptions} >
      <Drawer.Screen name="Home" component={Principal} />
      <Drawer.Screen name="Resumen de Resultados" component={Principal} />
    </Drawer.Navigator>
  );
}

export default function Navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Prueba} />
                <Stack.Screen name="Main" component={MyDrawer} />
            </Stack.Navigator>
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
