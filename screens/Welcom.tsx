import React, { Component } from 'react'
import {  View, StyleSheet, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/themed';
import { FontAwesome, Ionicons} from '@expo/vector-icons';

export default function Welcom({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../imagenes/1.jpg')} blurRadius={80} style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Chat"
                            icon={<Ionicons name="chatbubbles-outline" size={24} color="white" style={{ marginRight: 10 }} />}
                            buttonStyle={styles.welcomeButton}
                            onPress={() => navigation.navigate('Home')}
                        />
                        <Button
                            title="Iniciar Sesión"
                            icon={<FontAwesome name="user-circle-o" size={24} color="white" style={{ marginRight: 10 }} />}
                            buttonStyle={styles.welcomeButton}
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        width: '85%',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        gap: 15,
    },
    welcomeButton: {
        backgroundColor: '#9bd0bb',
        borderRadius: 30,
        height: 55,
    },
});
