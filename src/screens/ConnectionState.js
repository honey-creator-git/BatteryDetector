import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-native-paper';
import RoundButton from '../components/CustomButton';
import Images from '../assets/Images';

const ConnectionStateScreen = (props) => {
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const handleConnectionConfirm = () => {
        console.log("Connection Confirmed !");
    }
    return (
        <ScrollView>
            <View style={styles.paymentScreenContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.connectionStateText}>Connection station</Text></View>
                <View style={[styles.goBack, {marginTop: 100}]}><Text style={styles.completionText}>Completed</Text></View>
                <View>
                    <ProgressBar
                        progress={1}
                        color={'#59C7EA'}
                        style={styles.connectionStateProgress}
                    />
                </View>
                <View style={styles.connectionStateConfirm}>
                    <RoundButton title={'End'} onPress={() => handleConnectionConfirm()} />
                </View>
            </View>
        </ScrollView>
    );
}

export default ConnectionStateScreen;

const styles = StyleSheet.create({
    paymentScreenContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
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
    connectionStateText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    completionText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    connectionStateProgress: {
        width: Dimensions.get('window').width - 60,
        height: 10,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
    },
    connectionStateConfirm: {
        width: Dimensions.get('window').width - 60,
        marginTop: 350,
        alignSelf: 'center'
    },
})