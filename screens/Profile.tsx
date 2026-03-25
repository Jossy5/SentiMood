import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation, route }) {
  const user = route.params?.user || { name: 'Usuario', username: 'sin datos' };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Welcom' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={120} color="#9bd0bb" />
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={22} color="#9bd0bb" />
            <View style={styles.infoText}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="at-outline" size={22} color="#9bd0bb" />
            <View style={styles.infoText}>
              <Text style={styles.label}>Usuario</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#9bd0bb" />
            <View style={styles.infoText}>
              <Text style={styles.label}>Rol</Text>
              <Text style={styles.value}>Administrador</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    backgroundColor: '#9bd0bb',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoText: {
    marginLeft: 15,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e76f51',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
