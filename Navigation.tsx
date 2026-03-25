import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

///Importacion de Pantallas desde la carpeta screens
import Principal from './screens/Principal'
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Welcom from './screens/Welcom';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => props.navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MyDrawer({ route }) {
  const user = route.params?.user;

  return (
    <Drawer.Navigator
      screenOptions={myDrawerOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Resumen de Resultados" component={Dashboard} />
      <Drawer.Screen name="Home" component={Principal} />
      <Drawer.Screen name="Profile" component={Profile} initialParams={{ user }} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
}

export default function Navigator(){
    const [cargando, setCargando] = useState(true);
    const [sesionGuardada, setSesionGuardada] = useState<any>(null);

    useEffect(() => {
      const verificarSesion = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            setSesionGuardada(JSON.parse(userData));
          }
        } catch (error) {
          console.error('Error al verificar sesión:', error);
        } finally {
          setCargando(false);
        }
      };
      verificarSesion();
    }, []);

    if (cargando) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          <ActivityIndicator size="large" color="#9bd0bb" />
        </View>
      );
    }

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={sesionGuardada ? 'Main' : 'Welcom'}>
                <Stack.Screen name="Welcom" component={Welcom} />
                <Stack.Screen name="Home" component={Principal} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={MyDrawer} initialParams={sesionGuardada ? { user: sesionGuardada } : undefined} />
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

const styles = StyleSheet.create({
  drawerFooter: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  profileButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
