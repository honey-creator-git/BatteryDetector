import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import I18n from './../../../i18n/i18n';

const HistoryScreen = (props) => {
    // const history = [
    //     { date: '23/08/07', time: '13:20 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' },
    //     { date: '23/08/05', time: '6:49 AM', ip: '192.155.42.18', name: 'CARL A.', price: '1' },
    //     { date: '23/08/02', time: '10:24 AM', ip: '163.18.229.135', name: 'DAVID W.', price: '1' },
    //     { date: '23/07/30', time: '13:20 PM', ip: '194.124.77.182', name: 'TONY L.', price: '1' },
    //     { date: '23/07/17', time: '20:10 PM', ip: '195.125.63.58', name: 'LESLIE R.', price: '1' },
    //     { date: '23/08/07', time: '8:50 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' },
    //     { date: '23/08/07', time: '13:20 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' },
    //     { date: '23/08/07', time: '13:20 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' },
    //     { date: '23/08/07', time: '13:20 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' },
    //     { date: '23/08/07', time: '13:20 PM', ip: '192.173.62.115', name: 'JAMES Q.', price: '1' }
    // ]
    const batteryUsers = props.route.params.batteryUsers;
    const ip = props.route.params.ip;
    const handleGoBack = () => {
        props.navigation.goBack();
    }
    return (
        <View style={styles.historyContainer}>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={() => handleGoBack()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
            </View>
            <View style={[styles.historyContainerStyle, { marginTop: 20 }]}>
                <Text style={styles.historyText}>{I18n.t('history')}</Text>
            </View>
            <View style={styles.historyListStyle}>
                <ScrollView contentContainerStyle={styles.scrollStyle}>
                    {
                        batteryUsers.map((item, index) => {
                            return (
                                <View key={index} style={styles.scrollItemContainer}>
                                    <View style={[styles.itemLeft, { marginRight: 15 }]}>
                                        <View style={{marginBottom: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={[styles.itemdatetimeText, {marginRight: 5}]}>{item["touchedAt"]}</Text></View>
                                        <View style={{marginBottom: 3}}><Text style={styles.itemIpAddressText}>{ip}</Text></View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}><Text style={styles.itemNameText}>{item["firstName"]}</Text><Text style={[styles.itemNameText, {marginLeft: 5}]}>{item["lastName"].charAt(0)}.</Text></View>
                                    </View>
                                    <View style={styles.itemRight}>
                                        <View style={{alignSelf: 'center'}}><Text style={styles.totalText}>{I18n.t('total')}</Text></View>
                                        <View style={styles.priceContainer}><Text style={[styles.priceText, { marginRight: 3 }]}>$</Text><Text style={styles.priceText}>1</Text></View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default HistoryScreen;

const styles = StyleSheet.create({
    historyContainer: {
        width: '100%',
        height: '100%',
        paddingVertical: 50,
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
    historyContainerStyle: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    historyText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000000',
    },
    historyListStyle: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#F5F3F3',
        padding: 15,
        marginVertical: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        maxHeight: Dimensions.get('window').height - 220,
    },
    scrollStyle: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    scrollItemContainer: {
        width: Dimensions.get('window').width - 130,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingLeft: 20,
        paddingRight: 20,
    },
    itemLeft: {
        height: 60,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    itemRight: {
        height: 60,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    itemdatetimeText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#A39C9C'
    },
    itemIpAddressText: {
        fontWeight: '400',
        fontSize: 14,
        color: '#000000'
    },
    itemNameText: {
        fontWeight: '800',
        fontSize: 14,
        color: '#000000'
    },
    totalText: {
        fontWeight: '400',
        fontSize: 14,
        color: '#A39C9C'
    },
    priceText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    priceContainer: {
        width: 84,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#D7F2FA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})