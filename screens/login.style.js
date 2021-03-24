import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forms: {
        width: '100%',
        maxWidth: 300,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,height: 5,
        },
        shadowOpacity: 0.2,
        backgroundColor: 'rgb(255, 250, 255)',
    },
    buttonView: {
        // marginTop: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    otherButtonView: {
        marginTop: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    button: {
        padding: 10,
    },
});

export default loginStyles;