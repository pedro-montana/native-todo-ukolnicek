import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import One from './one';
import { firebase } from '../firebase';
import moment from 'moment';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Tasks = ({ activeTasks }) => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks, archivedTasks } = useTasks(selectedProject);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
    }, []);

    const archiveTask = () => {
        firebase
            .firestore()
            .collection('tasks')
            .doc(hotTask.id)
            .update({
                archived: moment().format('YYYY/MM/DD'),
            });
    };

    const reviveTask = () => {
        firebase.firestore().collection('tasks').doc(hotTask.id).update({
            archived: false,
        });
    };

    let projectName = '';
    if (
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)
    ) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [hotTask, setHotTask] = useState({
        id: 0,
        task: '',
        description: '',
    });

    const tasksUnderlayColor = '#8c80ff';

    if (!activeTasks)
    // completed tasks
        return (
            <View style={styles.list}>
                {/* <Text style={styles.heading}>Archive</Text> */}
                {archivedTasks.length > 0 ? (
                    <FlatList
                        data={archivedTasks}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item }) => {
                            return (
                                <TouchableHighlight
                                    onPress={() => {
                                        setModalVisible(true), setHotTask(item);
                                    }}
                                    style={[styles.oneTask, { backgroundColor: '#d3d1e0' }]}
                                    underlayColor={tasksUnderlayColor}
                                >
                                    <View>
                                        <Text style={styles.text} key={item.id}>
                                            {item.task}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        }}
                    />
                ) : (
                    <Text>Nothing here...</Text>
                )}
                <One
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    hotTask={hotTask}
                    archiveTask={archiveTask}
                    activeTasks={activeTasks}
                    reviveTask={reviveTask}
                />
            </View>
        );

    // active tasks
    return (
        <View style={styles.list}>
            {/* <Text style={styles.heading}>{selectedProject}</Text> */}
            {tasks.length > 0 ? (
                <FlatList
                    data={tasks}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible(true), setHotTask(item);
                                }}
                                style={styles.oneTask}
                                underlayColor={tasksUnderlayColor}
                            >
                                <View>
                                    <Text style={styles.text} key={item.id}>
                                        {item.task}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
            ) : (
                <Text>Nothing here...</Text>
            )}
            <One
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                hotTask={hotTask}
                archiveTask={archiveTask}
                activeTasks={activeTasks}
            />
        </View>
    );
};

export default Tasks;

const styles = StyleSheet.create({
    oneTask: {
        padding: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#bab3ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold',
        color: 'black',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: '50%',
    },
    list: {
        width: '90%',
        minHeight: '80%',
        justifyContent: 'flex-start',
    },
});
