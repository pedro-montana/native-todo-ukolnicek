import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './screens/Details';
import Home from './screens/Home';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import LogInContext from './context';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const value = { isLoggedIn, setIsLoggedIn };
    return (
        <LogInContext.Provider value={value}>
            <NavigationContainer>
                <Navigator>
                    {isLoggedIn ? (
                        <>
                            <Screen
                                name="Home"
                                component={Home}
                                options={{ title: 'Welcome' }}
                            />
                            <Screen
                                name="Details"
                                component={Details}
                                options={{ title: 'Take a look' }}
                            />
                        </>
                    ) : (
                        <>
                            <Screen name="LogIn" component={LogIn} options={{ title: 'Log In' }} />
                            <Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
                        </>
                    )}
                </Navigator>
            </NavigationContainer>
        </LogInContext.Provider>
    );
}
