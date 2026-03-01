import React from 'react';
import { View,StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

export default function Principal({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, borderWidth: 3, borderColor: 'red' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.borde}>
            <DrawerButton navigation={navigation} />
            <Chat />
          </View>
        </TouchableWithoutFeedback>
        <MessageUser />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function DrawerButton({ navigation }) {
  return (
    <View style={styles.drawer}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function Chat() {
  return (

    <View style={styles.chat}>

    </View>
  );
}

function MessageUser() {
  return (
    <View style={styles.messageinput}>
      <TextInput
        placeholder="Como te sientes el dia de hoy?.."
        placeholderTextColor="#9d9d9d"
        style={styles.textInputStyle}
      />
      <TouchableOpacity style={styles.sendButton}>
        <Octicons name="paper-airplane" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  drawer: {
    width: '25%',
    height: '10%',
    borderWidth: 3,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#B1E6D1',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'

  },
  sendButton: {
    backgroundColor: '#B1E6D1',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  messageinput: {
    width: '100%',
    height: '10%',
    borderWidth: 3,
    borderColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#9d9d9d',
    paddingHorizontal: 20,
    marginRight: 10,
  },
  chat: {
    flex: 1,
    //borderWidth: 3,
    //borderColor: 'green'
  },
  borde: {
    flex:1,
    borderWidth: 3,
    borderColor: 'green',
  }
});