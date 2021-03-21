import React, { useContext } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import LogInContext from '../context';
import globalStyles from '../global.style';

export default function Home({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('Details');
    }

    const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);

  return (
    <View style={globalStyles.container}>
        <Text>Home</Text>
        <Button title="go to details" onPress={pressHandler} />
        <Button title="Log Out" onPress={() => setIsLoggedIn(false)} />
    </View>
  );
}
