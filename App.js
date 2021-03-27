import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import { AuthProvider } from './context';
import TasksScreen from './screens/TasksScreen';
import CompletedTasks from './screens/CompletedTasks';
import { firebase } from './firebase';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
      }, []);

    return (
        <AuthProvider>
            <NavigationContainer>
                <Navigator>
                    {currentUser ? (
                        <>
                            <Screen
                                name="Home"
                                component={Home}
                                options={{ title: 'Welcome' }}
                            />
                            <Screen
                                name="TasksScreen"
                                component={TasksScreen}
                                options={{ title: 'Upcoming Tasks' }}
                            />
                            <Screen
                                name="CompletedTasks"
                                component={CompletedTasks}
                                options={{ title: 'Completed Tasks' }}
                            />
                        </>
                    ) : (
                        <>
                            <Screen
                                name="LogIn"
                                component={LogIn}
                                options={{ title: 'Log In' }}
                            />
                            <Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ title: 'Sign Up' }}
                            />
                        </>
                    )}
                </Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
