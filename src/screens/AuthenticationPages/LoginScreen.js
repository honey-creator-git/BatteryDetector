import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const LoginScreen = (props) => {
    return (
        <View style={{backgroundColor: 'white', height: Dimensions.get('window').height}}>
            <Text>Login</Text>
        </View>
    )
}

export default LoginScreen