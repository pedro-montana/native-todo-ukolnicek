import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import LogInContext from '../context';
import styles from './login.style';

export default function LogIn({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('SignUp');
    };

    const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={() => {}}
            >
                {(props) => (
                    <View style={styles.forms}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            secureTextEntry={true}
                        />
                        <View style={styles.buttonView}>
                            <Button
                                title="Log In"
                                style={styles.button}
                                color="#6344d3"
                                onPress={() => setIsLoggedIn(true)}
                            />
                        </View>
                        <View style={styles.otherButtonView}>
                            <Text>Don't have an account?</Text>
                            <Button
                                title="Sign Up"
                                style={styles.button}
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
