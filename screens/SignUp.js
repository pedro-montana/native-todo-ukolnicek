import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import styles from './login.style';

export default function SignUp({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('LogIn');
    }

  return (
    <View style={styles.container}>
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={(values) => {
                values.email &&
                values.password &&
                values.confirmPassword ? (
                    values.password.length > 0 && values.password === values.confirmPassword ?
                    pressHandler : Alert.alert('passwords don\'t match')
                    ) :
                    Alert.alert('Enter valid email address and password')
            }}
        >
            {(props) => (
                <View style={styles.forms}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirm password'
                        onChangeText={props.handleChange('confirmPassword')}
                        value={props.values.confirmPassword}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonView}>
                        <Button
                            title='Sign Up'
                            style={styles.button}
                            color='#6344d3'
                            onPress={props.handleSubmit}
                        />
                    </View>
                    <View style={styles.otherButtonView}>
                        <Text>Already have an account?</Text>
                        <Button
                            title='Log In'
                            style={styles.button}
                            color='#a8a8bd'
                            onPress={pressHandler}
                        />
                    </View>
                </View>
            )}
        </Formik>
    </View>
  );
}
