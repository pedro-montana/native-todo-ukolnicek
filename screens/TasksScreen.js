import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Flatlist } from 'react-native';
import Tasks from '../components/tasks';
import globalStyles from '../global.style';
import {
    ProjectsProvider,
    SelectedProjectProvider,
} from '../context';

export default function TasksScreen({ navigation }) {

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <View style={globalStyles.container}>
                    <Tasks activeTasks={true} navigation={navigation} />
                </View>
            </ProjectsProvider>
        </SelectedProjectProvider>
    );
}
