import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext, AuthProvider } from '../context';
import loginStyles from './login.style';
import DismissKeyboard from '../utils/dismissKeyboard';
import { firebase } from '../firebase';

export default function LogIn({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('SignUp');
    };

    async function logIn(values) {
        // setIsLoggedIn(true);
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password);
        } catch (error) {
            Alert.alert(error.message);
        }
    }


    return (
        <DismissKeyboard>
            <View style={loginStyles.container}>
                <Formik
                    initialValues={{
                        email: 'mujmail@mujmail.com',
                        password: '12345678',
                    }}
                    onSubmit={(values) => {
                        logIn(values);
                    }}
                >
                    {(props) => (
                        <View style={loginStyles.forms}>
                            <TextInput
                                style={loginStyles.input}
                                placeholder="Email"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={loginStyles.input}
                                placeholder="Password"
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                secureTextEntry={true}
                            />
                            <View style={loginStyles.buttonView}>
                                <Button
                                    title="Log In"
                                    style={loginStyles.button}
                                    color="#6344d3"
                                    onPress={props.handleSubmit}
                                />
                            </View>
                            <View style={loginStyles.otherButtonView}>
                                <Text>Don't have an account?</Text>
                                <Button
                                    title="Sign Up"
                                    style={loginStyles.button}
                                    color="#a8a8bd"
                                    onPress={pressHandler}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </DismissKeyboard>
    );
}
