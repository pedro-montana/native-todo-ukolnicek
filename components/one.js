import moment from 'moment';
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Modal,
    ScrollView,
    Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function One({
    modalVisible,
    setModalVisible,
    hotTask,
    archiveTask,
    activeTasks,
    reviveTask,
    editMode,
    setEditMode,
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView styles={styles.taskContent}>
                        <Pressable onPress={() => {setModalVisible(false),setEditMode(true)}}>
                        <Text style={styles.modalHeading}>{hotTask.task}{activeTasks && ' *'}</Text>
                        </Pressable>
                        {hotTask.date !== '' && (
                            <Text style={[styles.modalDescription, styles.modalDate]}>
                                Date: {moment(hotTask.date, 'YYYY/MM/DD').format(
                                    'DD.MM.YYYY'
                                )}
                            </Text>
                        )}
                        <Text style={styles.modalDescription}>
                            {hotTask.description.length > 0
                                ? hotTask.description
                                : ''}
                        </Text>
                    </ScrollView>
                </View>
                {activeTasks ? (
                    // active tasks
                    <View style={styles.bottomView}>
                        <Pressable
                            style={[styles.button, styles.buttonComplete]}
                            onPress={() => {
                                archiveTask(), setModalVisible(false);
                            }}
                        >
                            {/* <Text style={styles.textStyle}>Completed!</Text> */}
                            <MaterialIcons style={styles.completedIcon} name="done-outline" size={24} color="white" />
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                ) : (
                    // completed tasks
                    <View style={styles.bottomView}>
                        <Pressable
                            style={[
                                styles.button,
                                styles.buttonComplete,
                                { backgroundColor: '#166916' },
                            ]}
                            onPress={() => {
                                reviveTask(), setModalVisible(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Undone</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                )}
            </View>
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
    completedIcon: {
        alignSelf: 'center',
    },
    modalHeading: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 22,
    },
    modalDate: {
        color: '#000099',
    },
    modalDescription: {
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 18,
    },
    taskContent: {
        marginHorizontal: 0,
    },
});
