import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat, Send, InputToolbar, Composer,Bubble } from 'react-native-gifted-chat'
import { TextInput } from 'react-native-gesture-handler';


export default function Principal({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hola. ¿Cómo te sientes el día de hoy?',
        createdAt: new Date(),
        user: {
          name: 'Bot de RRHH',
          avatar: 'https://ui-avatars.com/api/?name=Bot&background=9bd0bb&color=fff',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: 'center' }}>
        <View style={styles.sendButton}>
          <Octicons name="paper-airplane" size={28} color="white" />
        </View>
      </Send>
    );
  };

  const renderComposer = (props) => {
    return (
      <View style={{flex:1, borderWidth:1,borderColor: '#9d9d9d', borderRadius:50, justifyContent: 'center', paddingTop:5, paddingLeft:5 }}>
        <Composer
          {...props}
        ></Composer>
      </View>

    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.toolbarContainer}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  };

  const renderBubble = (props) =>{
    return(
      <Bubble
      {...props}
      wrapperStyle={{
        right:{backgroundColor: '#9bd0bb'}
        
      }}
      textStyle={{
          right: {
            fontSize: 15 
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flex: 1 }}>
          <DrawerButton navigation={navigation} />
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: 1 }}

            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderComposer={renderComposer}
            renderBubble={renderBubble}

            showUserAvatar={false}
            isSendButtonAlwaysVisible
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawer: {
    width: '25%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#9bd0bb',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999

  },
  sendButton: {
    backgroundColor: '#9bd0bb',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:5

  },
  toolbarContainer: {
    borderTopWidth: 0,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
});