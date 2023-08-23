import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import RoundButton from '../components/CustomButton';

const AddVirtualBatteryScreen = (props) => {
    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const saveVirtualBattery = () => {
        props.navigation.navigate("Home");
    }
    return (
        <ScrollView>
            <View style={styles.addVirtualBatteryContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.selecitonText}>Add Virtual Battery</Text></View>
                <View style={[styles.chargeAddItemStyle, { marginTop: 100 }]}>
                        <Text style={styles.nameText}>Virtual Battery Name:</Text>
                        <Input
                            defaultValue=''
                            inputContainerStyle={styles.inputName}
                            inputStyle={styles.inputNameStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='Name'
                            placeholderTextColor={'#97999B'}
                            onChangeText={(text) => {setName(text)}}
                        />
                </View>
                <View style={[styles.chargeAddItemStyle, { marginTop: 30 }]}>
                    <Text style={styles.nameText}>Virtual Battery IP Address:</Text>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputName}
                        inputStyle={styles.inputNameStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='000.000.000.000'
                        placeholderTextColor={'#97999B'}
                        onChangeText={(text) => {setIpAddress(text)}}
                    />
                </View>
                <View style={styles.saveBtn}>
                    <RoundButton title={'Save'} onPress={() => saveVirtualBattery()} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    addVirtualBatteryContainer: {
        width: '100%',
        height: Dimensions.get("window").height,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    goBack: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    selecitonText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    chargeAddItemStyle: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    inputName: {
        width: Dimensions.get('window').width - 60,
        height: 48,
        backgroundColor: '#F5F3F3',
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
    },
    saveBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 60,
        alignSelf: 'center'
    },
})

export default AddVirtualBatteryScreen;