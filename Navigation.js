import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";
import { getLanguages } from 'react-native-i18n';

import AuthenticationScreen from './src/screens/AuthenticationScreen';
import HomeScreen from './src/screens/HomeScreen';
import PaymentDataScreen from './src/screens/PaymentDataScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import VirtualBatteryScreen from './src/screens/VirtualBatteryScreen';
import AddVirtualBatteryScreen from './src/screens/AddVirtualBatteryScreen';

import ChargeSearch from './src/screens/Admin/ChargeSearch';
import AddCharge from './src/screens/Admin/AddChargeScreen';
import MapScreen from './src/screens/Admin/MapScreen';
import HistoryScreen from './src/screens/Admin/HistoryScreen';
import CardInfoScreen from './src/screens/CardInfoScreen';
import ConnectionStateScreen from './src/screens/ConnectionState';

import { languageActions } from './redux/actions/languageAction';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getLanguages().then(languages => {
            // console.log(languages[0]); // ['en-US', 'en']
            const languageCode = languages[0].split("-")[0];
            dispatch(languageActions.setLanguage(languageCode));
        });
    }, []);
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
                <Stack.Screen name="CardInfo" component={CardInfoScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="ConnectoinState" component={ConnectionStateScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>

                <Stack.Screen name="ChargeSearch" component={ChargeSearch} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="AddCharge" component={AddCharge} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="History" component={HistoryScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Selection" component={SelectionScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="VirtualBattery" component={VirtualBatteryScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="AddVirtualBattery" component={AddVirtualBatteryScreen} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
            </Stack.Navigator>            
        </NavigationContainer>
    )
}

export default Navigation