import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';
import RoundButton from '../components/CustomButton';

const SelectionScreen = (props) => {
    const [batteryRecharge, setBatteryRecharge] = useState(true);
    const [powerOn, setPowerOn] = useState(false);
    const [virtualBattery, setVirtualBattery] = useState(false);
    const [ups, setUps] = useState(false);

    const handleGoBak = () => {
        props.navigation.goBack();
    }

    const handleBatteryRecharge = () => {
        if(batteryRecharge == false) {
            setBatteryRecharge(!batteryRecharge);
            setPowerOn(false)
            setVirtualBattery(false)
            setUps(false)
        }
    }

    const handlePowerOn = () => {
        if(powerOn == false) {
            setPowerOn(!powerOn);
            setBatteryRecharge(false)
            setVirtualBattery(false)
            setUps(false)
        }
    }

    const handleVirtualBattery = () => {
        if(virtualBattery == false) {
            setVirtualBattery(!virtualBattery)
            setBatteryRecharge(false)
            setPowerOn(false)
            setUps(false)
        }
    }

    const handleUPS = () => {
        if(ups == false) {
            setUps(!ups)
            setBatteryRecharge(false)
            setPowerOn(false)
            setVirtualBattery(false)
        }
    }

    const handleNextForSelection = () => {
        if (virtualBattery == true) {
            props.navigation.navigate("VirtualBattery");
        } else {
            props.navigation.navigate("Home");
        }
    }

    return (
        <ScrollView>
            <View style={styles.selectionScreenContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.selecitonText}>Selection</Text></View>
                <View style={[styles.goBack, {marginTop: 5}]}><Text style={styles.selectOptionText}>Select one of the options</Text></View>
                <View style={[styles.optionChooseHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.optionTitle}>Battery Recharge</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={batteryRecharge} status={ batteryRecharge === true ? 'checked' : 'unchecked' } onPress={() => handleBatteryRecharge()} color='#59C7EA' />
                    </View>
                </View>
                <View style={[styles.optionChooseHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.optionTitle}>Power On</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={powerOn} status={ powerOn === true ? 'checked' : 'unchecked' } onPress={() => handlePowerOn()} color='#59C7EA' />
                    </View>
                </View>
                <View style={[styles.optionChooseHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.optionTitle}>Virtual Battery</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={virtualBattery} status={ virtualBattery === true ? 'checked' : 'unchecked' } onPress={() => handleVirtualBattery()} color='#59C7EA' />
                    </View>
                </View>
                <View style={[styles.optionChooseHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.optionTitle}>UPS</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={ups} status={ ups === true ? 'checked' : 'unchecked' } onPress={() => handleUPS()} color='#59C7EA' />
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.payBtn}>
                    <RoundButton title={'Next'} onPress={() => handleNextForSelection()} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    selectionScreenContainer: {
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
    selectOptionText: {
        fontSize: 14,
        color: '#000000'
    },
    optionChooseHeader: {
        width: Dimensions.get('window').width - 60,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000'
    },
    divider: {
        width: Dimensions.get('window').width - 60,
        borderWidth: 1,
        borderColor: '#DCDFE7',
        marginVertical: 30,
        alignSelf: 'center'
    },
    payBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 15,
        alignSelf: 'center'
    },
})

export default SelectionScreen;