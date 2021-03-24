import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Linking } from 'react-native';
import { LogInContext } from '../context';
import globalStyles from '../global.style';
import NewTask from '../components/newTask';

export default function Home({ navigation }) {
    const [newTask, setNewTask] = useState(false);

    const navigateTasks = () => {
        navigation.navigate('TasksScreen');
    };
    const navigateCompletedTasks = () => {
        navigation.navigate('CompletedTasks');
    };

    const { setIsLoggedIn } = useContext(LogInContext);

    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      }

    return (
        <View
            style={[globalStyles.container, { justifyContent: 'flex-start' }]}
        >
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>TODO - úkolníček</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => setNewTask(true)}
                    underlayColor="grey"
                >
                    <Text style={styles.buttonText}>New Task</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={navigateTasks}
                    underlayColor="grey"
                >
                    <Text style={styles.buttonText}>All Tasks</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={navigateCompletedTasks}
                    underlayColor="grey"
                >
                    <Text style={styles.buttonText}>Completed Tasks</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => setIsLoggedIn(false)}
                    underlayColor="grey"
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableHighlight>
                <TouchableHighlight
                        style={[styles.gitHubButton]}
                        onPress={() => openURL('https://github.com/pedro-montana/native-todo-ukolnicek')}
                        underlayColor="grey"
                    >
                        <Text style={styles.buttonText}>Project GitHub {'</>'}</Text>
                    </TouchableHighlight>
            </View>
            <NewTask modalVisible={newTask} setModalVisible={setNewTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        height: '20%',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        height: '70%',
        width: '60%',
        justifyContent: 'space-around',
    },
    button: {
        borderRadius: 20,
        height: 50,
        backgroundColor: '#6344d3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    gitHubButton: {
        borderRadius: 40,
        marginTop: 20,
        backgroundColor: 'grey',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
