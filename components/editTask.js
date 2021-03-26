import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Button,
} from 'react-native';
import { firebase } from '../firebase';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function EditTask({
    modalVisible,
    setModalVisible,
    hotTask,
    setHotTask,
    showActiveTask,
    setShowActiveTask,
    onRefresh,
}) {
    const [task, setTask] = useState(hotTask.task);
    const [description, setDescription] = useState(hotTask.description);
    const [date, setDate] = useState(hotTask.date);
    const [showDate, setShowDate] = useState(false);
    const [noDate, setNoDate] = useState(false);

    const chooseDate = () => {
        setShowDate(true);
        setNoDate(false);
    };

    const cancelNewTask = () => {
        setTask('');
        setDescription('');
        setDate(new Date());
        setShowDate(false);
        setModalVisible(!modalVisible);
    };

    const updateTask = () => {
        firebase
            .firestore()
            .collection('tasks')
            .doc(hotTask.id)
            .update({
                task,
                description,
                date: moment(date).format('YYYY/MM/DD'),
            })
            .then(() => {
                setHotTask({...hotTask, description, task, date});
                setTask('');
                setDescription('');
                setModalVisible(false);
                onRefresh();
                setShowActiveTask(true);
            });
    };

    const onDateChange = (event, selectedDate) => {
        setShowDate(false);
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    useEffect(() => {
        setTask(hotTask.task);
        setDescription(hotTask.description);
        setDate(moment(hotTask.date, 'YYYY/MM/DD'));
    }, [modalVisible]);

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
                        <Text style={styles.modalHeading}>Edit Task</Text>
                        {!showDate && (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.inputLabel}>Task</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={task}
                                        onChangeText={(text) => setTask(text)}
                                    />
                                </View>
                                <View style={styles.descriptionRow}>
                                    <Text style={styles.inputLabel}>
                                        Description
                                    </Text>
                                    <TextInput
                                        multiline
                                        numberOfLines={4}
                                        style={styles.descriptionInput}
                                        value={description}
                                        onChangeText={(text) =>
                                            setDescription(text)
                                        }
                                        textAlignVertical="top"
                                    />
                                </View>
                            </>
                        )}
                        <View style={{ width: '100%' }}>
                            {showDate ? (
                                <View style={styles.dateView}>
                                    <DateTimePicker
                                        mode="date"
                                        value={`${moment(
                                            date,
                                            'YYYY/MM/DD'
                                        ).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                        onChange={onDateChange}
                                        display="calendar"
                                    />
                                    <Text style={styles.dateText}>
                                        {moment(date, 'YYYY/MM/DD').format(
                                            'DD.MM.YYYY'
                                        )}
                                    </Text>

                                    <Pressable
                                        style={[
                                            styles.button,
                                            styles.buttonSelectDate,
                                            { backgroundColor: 'blue' },
                                        ]}
                                        onPress={() => setShowDate(false)}
                                    >
                                        <Text style={styles.textStyle}>OK</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Text style={styles.dateLabel}>Date: </Text>
                                    <Button
                                        style={[
                                            styles.button,
                                            styles.buttonSelectDate,
                                        ]}
                                        onPress={chooseDate}
                                        title={
                                            !noDate
                                                ? moment(date).format(
                                                      'DD.MM.YYYY'
                                                  )
                                                : 'Without date'
                                        }
                                        color="blue"
                                    />
                                    {!noDate && (
                                        <AntDesign
                                            name="closecircle"
                                            size={24}
                                            color="red"
                                            style={{
                                                alignSelf: 'center',
                                                marginLeft: 20,
                                            }}
                                            onPress={() => setNoDate(true)}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <Pressable
                            style={[styles.button, styles.buttonComplete]}
                            onPress={updateTask}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={cancelNewTask}
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
        marginTop: 0,
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
    dateView: {
        justifyContent: 'center',
        // alignItems: 'center',
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
    buttonSelectDate: {
        alignSelf: 'center',
        width: '100%',
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
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
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
        maxHeight: 150,
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
    dateText: {
        alignSelf: 'center',
        margin: 10,
        fontSize: 18,
    },
});
