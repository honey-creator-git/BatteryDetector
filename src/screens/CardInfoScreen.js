import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import RoundButton from '../components/CustomButton';
import Images from '../assets/Images';

const CardInfoScreen = (props) => {
    const [cardNumber, setPromoCode] = useState("");
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const submitProcessConfirm = () => {
        props.navigation.navigate("ConnectoinState");
    }
    return (
        <ScrollView>
            <View style={styles.paymentScreenContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.paymentText}>Payment</Text></View>
                <View style={styles.purchasedInfoContainer}>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 50, }}><Text style={styles.puchasedPriceText}>$1.00</Text></View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 10,}}><Text style={styles.firstOrderText}>On your first order</Text></View>
                    <View style={styles.divider}></View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 15,}}><Text style={styles.purchaseDesc}>Promo code valid for orders over $1</Text></View>
                </View>
                <View style={[styles.goBack, {marginTop: 50}]}><Text style={styles.payInfoText}>Payment Information</Text></View>
                <View style={styles.payCardContainer}>
                    <View style={{marginRight: 20}}><Image source={Images.visa_card} resizeMode='stretch' /></View>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                        <View style={{marginBottom: 3}}><Text style={styles.cardholderText}>Card holder</Text></View>
                        <View><Text style={styles.cardExpiration}>Master Card ending **98</Text></View>
                    </View>
                </View>
                <View style={[styles.goBack, {marginTop: 40}]}><Text style={styles.promoText}>Use promo code</Text></View>
                <Input
                    defaultValue=''
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.codeContainerStyle}
                    inputStyle={styles.inputStyle}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={"none"}
                    keyboardType={'email-address'}
                    placeholder='Email'
                    placeholderTextColor={'#97999B'}
                    onChangeText={(text) => {setPromoCode(text)}}
                    onSubmitEditing={() => {}}
                />
                <View style={styles.processConfirm}>
                    <RoundButton title={'Pay'} onPress={() => submitProcessConfirm()} />
                </View>
            </View>
        </ScrollView>
    );
}

export default CardInfoScreen;

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
    purchasedInfoContainer: {
        width: Dimensions.get('window').width - 60,
        height: 244,
        marginTop: 10,
        backgroundColor: '#59C7EA',
        borderRadius: 10,
        alignSelf: 'center',
    },
    paymentText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    puchasedPriceText: {
        fontWeight: '700',
        fontSize: 48,
        color: 'white'
    },
    firstOrderText: {
        fontWeight: '500',
        fontSize: 14,
        color: 'white'
    },
    divider: {
        width: Dimensions.get('window').width - 60,
        borderWidth: 1,
        borderColor: 'white',
        marginVertical: 20,
    },
    purchaseDesc: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    payInfoText: {
        fontWeight: '500',
        fontSize: 14,
        color: 'black'
    },
    payCardContainer: {        
        width: Dimensions.get('window').width - 60,
        height: 56,
        backgroundColor: '#F3F4F7',
        alignSelf: 'center',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    cardholderText: {
        fontWeight: '500',
        fontSize: 12,
        color: '#000000'
    },
    cardExpiration: {
        fontWeight: '400',
        fontSize: 12,
        color: '#A5A5A5'
    },
    promoText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    inputContainerStyle: {
        width: Dimensions.get('window').width - 60,
        height: 48,
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
    },
    codeContainerStyle: {
        width: Dimensions.get('window').width - 60,
        height: 48,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        marginTop: 10,
    },
    inputStyle: {
      fontSize: 14,
      fontFamily: 'Open Sans'
    },
    processConfirm: {
        width: Dimensions.get('window').width - 60,
        marginTop: 50,
        alignSelf: 'center'
    },
})