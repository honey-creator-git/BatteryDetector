import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View, Text, Dimensions } from "react-native";

const MyTabBar = ({ navigationState, navigation, position }) => {
    const [ tab, setTab ] = useState(true);
    const handleOnPress = (name) => {
        setTab(!tab);
        navigation.navigate(name);
    }
    return (
        <View style={{
          height: 48,
          backgroundColor: '#F3F4F7',
          marginTop: 60,
          marginBottom: 40,
          marginHorizontal: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 100,
          flexDirection: "row",
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
            <TouchableOpacity onPress={() => handleOnPress('Login')}>
                {
                    tab == true ?
                    <View style={[styles.buttonContainer, styles.tabBgColorWh]}><Text style={styles.buttonText}>Login</Text></View>
                    :
                    <View style={[styles.buttonContainer, styles.tabBgColorTr]}><Text style={styles.buttonText}>Login</Text></View>
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOnPress('Signup')}>
                {
                    tab == true ?
                    <View style={[styles.buttonContainer, styles.tabBgColorTr]}><Text style={styles.buttonText}>Signup</Text></View>   
                    :
                    <View style={[styles.buttonContainer, styles.tabBgColorWh]}><Text style={styles.buttonText}>Signup</Text></View>   
                }
            </TouchableOpacity> 
        </View>
    )
}

export default MyTabBar

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 35,
        width: (Dimensions.get('window').width - 60) / 2 - 20,
        shadowOffset: {
          width: 0,
          height: 0,
        },
    },
    tabBgColorWh: {
        backgroundColor: 'white'
    },
    tabBgColorTr: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: 'black'
    }
})