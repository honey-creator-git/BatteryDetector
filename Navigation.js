import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";

import AuthenticationScreen from './src/screens/AuthenticationScreen';
import HomeScreen from './src/screens/HomeScreen';
import PaymentDataScreen from './src/screens/PaymentDataScreen';

import ChargeSearch from './src/screens/Admin/ChargeSearch';
import AddCharge from './src/screens/Admin/AddChargeScreen';
import MapScreen from './src/screens/Admin/MapScreen';
import HistoryScreen from './src/screens/Admin/HistoryScreen';

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
                <Stack.Screen name="Payment" component={PaymentDataScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
            
                <Stack.Screen name="ChargeSearch" component={ChargeSearch} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="AddCharge" component={AddCharge} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="History" component={HistoryScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
            </Stack.Navigator>            
        </NavigationContainer>
    )
}

export default Navigation