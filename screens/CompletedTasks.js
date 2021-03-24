import React from 'react';
import { View } from 'react-native';
import Tasks from '../components/tasks';
import globalStyles from '../global.style';
import {
    ProjectsProvider,
    SelectedProjectProvider,
} from '../context';

export default function CompletedTasks({ navigation }) {

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <View style={globalStyles.container}>
                    <Tasks activeTasks={false} navigation={navigation} />
                </View>
            </ProjectsProvider>
        </SelectedProjectProvider>
    );
}
