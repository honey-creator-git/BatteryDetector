import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthenticationScreen from './src/screens/AuthenticationScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
            </Stack.Navigator>            
        </NavigationContainer>
    )
}

export default Navigation