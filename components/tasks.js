import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import globalStyles from '../global.style';
import styles from '../screens/login.style';

const Tasks = ({ tasks }) => {
    return (
        <View style={globalStyles.container}>
            {tasks.length > 0 ?
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.oneTask}>
                                <Text style={styles.text} key={item.id}>{item.name}</Text>
                            </View>
                        );
                    }}
                />
                :
                <Text>Nothing to show...</Text>
            }
        </View>
    )
}

export default Tasks;

const style = StyleSheet.create({
    oneTask: {
        padding: 50,
    },
    text: {
        margin: 30,
    }
})