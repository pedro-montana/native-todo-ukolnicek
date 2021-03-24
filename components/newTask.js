import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { firebase } from '../firebase';
import moment from 'moment';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function NewTask({ modalVisible, setModalVisible }) {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    const addTask = () => {
        const projectId = 'INBOX';
        let collatedDate = '';
        let createdTime = moment().format('YYYY/MM/DD HH:mm:ss');

        if (projectId === 'TODAY') {
            collatedDate = moment().format('YYYY/MM/DD');
        } else if (projectId === 'NEXT_7') {
            collatedDate = moment().add(7, 'days').format('YYYY/MM/DD');
        }

        return (
            projectId &&
            task !== '' &&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectId, // projectId: projectId
                    task, // task: task
                    date: collatedDate || '',
                    createdTime,
                    userId: 'o5xLFrfzgrbTnfK7Iq9Ut3dTX9S2',
                    description,
                })
                .then(() => {
                    setTask('');
                    setDescription('');
                    setModalVisible(false);
                })
        );
    };

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
        <DismissKeyboard>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeading}>New Task</Text>
                        <View style={styles.row}>
                            <Text style={styles.inputLabel}>Task</Text>
                            <TextInput
                                style={styles.input}
                                value={task}
                                onChangeText={(text) => setTask(text)}
                            />
                        </View>
                        <View style={styles.descriptionRow}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                style={styles.descriptionInput}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <Pressable
                            style={[styles.button, styles.buttonComplete]}
                            onPress={addTask}
                        >
                            <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
        </DismissKeyboard>
            </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalView: {
        width: '96%',
        height: '80%',
        minHeight: 300,
        margin: 20,
        backgroundColor: '#F7F7FF',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: '10%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        width: 150,
        maxWidth: '40%',
        height: 50,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonComplete: {
        backgroundColor: 'green',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    modalHeading: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 22,
    },
    modalDescription: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        marginLeft: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        backgroundColor: 'rgb(255, 250, 255)',
    },
    inputLabel: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descriptionRow: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 20,
    },
    descriptionInput: {
        minHeight: 60,
        width: '100%',
        marginVertical: 12,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        backgroundColor: 'rgb(255, 250, 255)',
        alignSelf: 'flex-start',
    },
});
