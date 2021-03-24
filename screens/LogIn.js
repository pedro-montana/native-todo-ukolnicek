import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { LogInContext } from '../context';
import loginStyles from './login.style';

export default function LogIn({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('SignUp');
    };

    const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);

    const logIn = () => {
        setIsLoggedIn(true);
    }

    return (
        <View style={loginStyles.container}>
            <Formik
                initialValues={{ email: 'mujmail@mujmail.com', password: '12345678' }}
                onSubmit={(values) => {
                    values.email == 'mujmail@mujmail.com' &&
                    values.password == 12345678 ?
                    logIn() :
                    Alert.alert('Enter valid email adress and password')
                }
                    
                }
            >
                {(props) => (
                    <View style={loginStyles.forms}>
                        <TextInput
                            style={loginStyles.input}
                            placeholder="Email"
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            autoCapitalize='none'
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
    );
}
