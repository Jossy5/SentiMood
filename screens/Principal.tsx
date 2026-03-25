import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat, Send, InputToolbar, Composer, Bubble, IMessage } from 'react-native-gifted-chat';

// ==========================================================
// CONFIGURACIÓN
// ==========================================================

const API_URL = 'https://coral-app-bo9qh.ondigitalocean.app/api/v1/analyze';

const respuestasPorEmocion: { [key: string]: string } = {
  happiness: "¡Qué increíble noticia! Me alegra muchísimo leer eso. ¡Sigue con esa energía positiva!",
  joy: "¡Qué alegría! Me encanta sentir esa buena vibra en tu mensaje.",
  "angry/hate": "Entiendo tu frustración. A veces las situaciones son agotadoras. ¿Quieres desahogarte más?",
  sadness: "Lamento que te sientas así. Recuerda que en el equipo estamos para apoyarte.",
  fear: "Es normal sentir incertidumbre. No estás solo, cuéntame qué te preocupa.",
  love: "¡Qué lindo sentimiento! Gracias por compartir ese lado positivo.",
  surprise: "¡Vaya, eso no lo esperaba! Cuéntame más detalles.",
  default: "Gracias por compartir cómo te sientes. Estoy aquí para escucharte."
};

const BOT_USER = {
  _id: 2,
  name: 'Bot de RRHH',
  avatar: 'https://ui-avatars.com/api/?name=Bot&background=9bd0bb&color=fff',
};

export default function Principal({ navigation }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hola. ¿Cómo te sientes el día de hoy?',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  // ==========================================================
  // LÓGICA DE CONEXIÓN CON EL BACKEND
  // ==========================================================
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const mensajeTexto = newMessages[0].text;
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: mensajeTexto,
          area: "infrastructure"
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      console.log("Datos recibidos de DigitalOcean:", data);

      let textoFinal = "";

      if (data.emotion && data.emotion.bot_response) {
        textoFinal = data.emotion.bot_response;
      } else if (data.emotion && data.emotion.label && respuestasPorEmocion[data.emotion.label]) {
        textoFinal = respuestasPorEmocion[data.emotion.label];
      } else {
        textoFinal = respuestasPorEmocion.default;
      }

      const botMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: textoFinal,
        createdAt: new Date(),
        user: BOT_USER,
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));

    } catch (error) {
      console.error("Error de conexión con DigitalOcean:", error);

      const errorMessage: IMessage = {
        _id: 'error-' + Date.now(),
        text: "Lo siento, no pude conectar con el servidor. Intenta de nuevo más tarde.",
        createdAt: new Date(),
        user: BOT_USER,
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [errorMessage]));
    } finally {
      setIsTyping(false);
    }
  }, []);

  // ==========================================================
  // RENDERERS DE UI (sin cambios)
  // ==========================================================
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
          <NavigationButton navigation={navigation} />
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: 1 }}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderComposer={renderComposer}
            renderBubble={renderBubble}
            showUserAvatar={false}
            isTyping={isTyping}
            isSendButtonAlwaysVisible
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function NavigationButton({ navigation }) {
  const isInDrawer = typeof navigation.openDrawer === 'function';

  return (
    <View style={styles.drawer}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => isInDrawer ? navigation.openDrawer() : navigation.goBack()}>
        <Ionicons name={isInDrawer ? "menu" : "arrow-back"} size={28} color="white" />
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
