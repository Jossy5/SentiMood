import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, ImageBackground, Alert } from 'react-native'
import { Input, Button } from '@rneui/themed';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function Prueba({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!correo.trim() || !contrasena.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa correo y contraseña');
      return;
    }

    setCargando(true);
    try {
      const response = await fetch('https://coral-app-bo9qh.ondigitalocean.app/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: correo.trim(),
          password: contrasena.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
        return;
      }

      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error de conexión', 'No se pudo conectar con el servidor. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/foto_login.jpeg')} blurRadius={80} style={styles.container}>
        <View style={styles.formContainer}>
          <Input
            placeholder='Correo'
            placeholderTextColor="rgba(255,255,255,0.7)"
            inputStyle={styles.inputText}
            leftIcon={<FontAwesome name="user-circle-o" size={24} color="white" />}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            secureTextEntry
            placeholder='Contraseña'
            placeholderTextColor="rgba(255,255,255,0.7)"
            inputStyle={styles.inputText}
            leftIcon={<Feather name="lock" size={24} color="white" />}
            value={contrasena}
            onChangeText={setContrasena}
          />
          <Button
            title={cargando ? "Verificando..." : "Iniciar Sesión"}
            icon={!cargando ? <Feather name="home" size={24} color="white" style={{ marginRight: 10 }} /> : undefined}
            buttonStyle={styles.loginButton}
            onPress={handleLogin}
            disabled={cargando}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  inputText: {
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#9bd0bb',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
  },
});
