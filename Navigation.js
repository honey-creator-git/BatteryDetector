import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";

import AuthenticationScreen from './src/screens/AuthenticationScreen';
import HomScreen from './src/screens/HomeScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <FlashMessage 
                position="top" 
                style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', alignItems: 'center' }}
                titleStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
            /> 
            <Stack.Navigator>
                <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
            </Stack.Navigator>            
        </NavigationContainer>
    )
}

export default Navigation