import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Flatlist } from 'react-native';
import Tasks from '../components/tasks';
import globalStyles from '../global.style';

export default function Details() {
    const [tasks, setTasks] = useState([
        {
            id: 0,
            name: 'first name',
        },
        {
            id: 1,
            name: 'second',
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                'https://orangevalleycaa.org/api/videos'
            )
            .then(response => response.json());
            setTasks(result);
        }
        fetchData();
    }, [])
  return (
    <View style={globalStyles.container}>
        <Tasks tasks={tasks} />
    </View>
  );
}
