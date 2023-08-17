import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Image, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import RoundButton from '../../components/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddCharge = (props) => {
    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [latLon, setLatLon] = useState('');
    const handleGoBak = () => {
        props.navigation.goBack()
    }
    const saveCharge = () => {
        console.log("Charge was saved !!!");
    }
    const handleLocation = () => {
        props.navigation.navigate('Map');
    }
    return (
        <View style={styles.addChargeStyle}>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
            </View>
            <View style={[styles.chargeAddItemStyle, { marginTop: 20 }]}>
                    <Text style={styles.nameText}>Name</Text>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputName}
                        inputStyle={styles.inputNameStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='Name'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => {setName(text)}}
                    />
            </View>
            <View style={[styles.chargeAddItemStyle, { marginTop: 30 }]}>
                    <Text style={styles.nameText}>IP Address</Text>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputName}
                        inputStyle={styles.inputNameStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='000.000.000.000'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => {setIpAddress(text)}}
                    />
            </View>
            <View style={[styles.chargeAddItemStyle, { marginTop: 30 }]}>
                    <Text style={styles.nameText}>Lat , Lon</Text>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputName}
                        inputStyle={styles.inputNameStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='000 : 000'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => {setLatLon(text)}}
                        onPressIn={() => handleLocation()}
                    />
            </View>
            <View style={styles.saveBtn}>
                <RoundButton title={'Save'} onPress={() => saveCharge()} />
            </View>
        </View>
    )
}

export default AddCharge;

const styles = StyleSheet.create({
    addChargeStyle: {
        width: '100%',
        marginVertical: 50,
    },
    goBack: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    chargeAddItemStyle: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    inputName: {
        width: Dimensions.get('window').width - 60,
        height: 48,
        backgroundColor: 'gray',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 3,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputNameStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Open Sans',
        color: 'white'
    },
    saveBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 60,
        alignSelf: 'center'
    },
})