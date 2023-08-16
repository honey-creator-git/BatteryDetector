import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const SignupScreen = (props) => {
    return (
        <View style={{backgroundColor: 'white', height: Dimensions.get('window').height}}>
            <Text>Signup</Text>
        </View>
    );
}

export default SignupScreen