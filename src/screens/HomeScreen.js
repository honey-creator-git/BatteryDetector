import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { ProgressBar } from 'react-native-paper';
import RoundButton from '../components/CustomButton';

const HomeScreen = (props) => {
    const [automation, setAutomation] = useState(true)
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const countries = ["192.173.62.115", "192.155.42.18", "163.18.229.135", "195.125.63.58"]
    return (
        <View style={styles.homeScreenContainer}>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
            </View>
            <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.homeText}>Home</Text></View>
            <View style={[styles.goBack, {marginTop: 5}]}><Text style={styles.selectChargeText}>Select Charge place</Text></View>
            <View style={[styles.goBack, {marginTop: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                <SelectDropdown
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    dropdownStyle={styles.dropdownStyle}
                    rowStyle={styles.rowStyle}
                    data={countries}
                    onSelect={(selectedItem, index) => {console.log(selectedItem, index)}}
                    buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                    rowTextForSelection={(item, index) => {return item}}
                    renderDropdownIcon={() => <FontAwesomeIcon icon={faCaretDown} size={15} style={{color: 'white'}} />}
                />
            </View>
            <View style={styles.divider}></View>
            <View style={[styles.batteryStatusHeader, {marginTop: 40}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.batteryTitle}>Battery Status:</Text><Text style={[styles.batteryTitle, {marginLeft: 5}]}>50%</Text></View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.automation}>Automation</Text>
                    <Switch
                        trackColor={'#D7F2FA'}
                        thumbColor={'#59C7EA'}
                        value={automation}  
                        onValueChange ={(automation)=> setAutomation(automation)}
                    />
                </View>
            </View>
            <View>
                <ProgressBar
                    progress={0.5}
                    color={'#59C7EA'}
                    style={styles.batteryProgress}
                />
            </View>
            <View style={styles.divider}></View>
            <View style={styles.batteryStatusHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.price}>Price:</Text><Text style={[styles.price, {marginLeft: 5}]}>$1</Text></View>
            </View>
            <View style={styles.payBtn}>
                <RoundButton title={'Pay Now'} onPress={() => submitPayment()} />
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeScreenContainer: {
        width: '100%',
        marginVertical: 20,
    },
    goBack: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    homeText: {
        fontSize: 24,
        color: '#161B1D'
    },
    selectChargeText: {
        fontSize: 14,
        color: '#000000'
    },
    buttonStyle: {
        width: Dimensions.get('window').width - 60,
        height: 42,
        backgroundColor: 'gray',
        borderRadius: 3,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonTextStyle: {
        fontSize: 14,
        color: 'white',
    },
    dropdownStyle: {
        backgroundColor: 'green',
        position: 'relative',
        right: 50
    },
    rowStyle: {
        backgroundColor: '#F3F4F7'
    },
    divider: {
        width: Dimensions.get('window').width - 60,
        borderWidth: 1,
        borderColor: '#DCDFE7',
        marginVertical: 30,
        alignSelf: 'center'
    },
    batteryStatusHeader: {
        width: Dimensions.get('window').width - 60,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    batteryTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000'
    },
    price: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    automation: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000'
    },
    batteryProgress: {
        width: Dimensions.get('window').width - 60,
        height: 10,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
    },
    payBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 15,
        alignSelf: 'center'
    },
})