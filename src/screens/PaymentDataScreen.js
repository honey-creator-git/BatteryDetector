import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import RoundButton from '../components/CustomButton';
import Images from '../assets/Images';

const PaymentDataScreen = (props) => {
    const [cardNumber, setCardNumber] = useState("");
    const [saveCard, seSaveCard] = useState(true);
    const [validUntil, setValidUntil] = useState('');
    const [CVV, setCVV] = useState('');
    const [name, setName] = useState('');
    const [cardFuture, setCardFuture] = useState(true);
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const submitProcessConfirm = () => {

    }
    return (
        <ScrollView>
            <View style={styles.paymentScreenContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.paymentText}>Payment data</Text></View>
                <View style={[styles.goBack, {marginTop: 5}]}><Text style={styles.paymentValue}>$1.00</Text></View>
                <View style={[styles.goBack, {marginTop: 30}]}><Text style={styles.paymentMethodText}>Payment method</Text></View>
                <View style={[styles.goBack, {marginTop: 15}]}>
                    <View style={styles.paymentItem}>
                        <Image source={Images.paypal_icon} resizeMode='stretch' />
                    </View>
                </View>
                <View style={[styles.goBack, {marginTop: 40}]}><Text style={styles.paymentMethodText}>Card number</Text></View>
                <View>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputCardNumber}
                        inputStyle={styles.inputCardNumberStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='0000.0000.0000.0000'
                        placeholderTextColor={'#B7B7B7'}
                        onChangeText={(text) => {setCardNumber(text)}}
                    />
                </View>
                <View style={[styles.goBack, {marginTop: 20}]}>
                    <View style={{width: (Dimensions.get('window').width - 60)/2, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={styles.periodText}>Valid until</Text>
                        <Input
                            defaultValue=''
                            inputContainerStyle={styles.inputPeriod}
                            inputStyle={styles.inputPeriodStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='Month / Year'
                            placeholderTextColor={'#B7B7B7'}
                            onChangeText={(text) => {setValidUntil(text)}}
                        />
                    </View>
                    <View style={{width: (Dimensions.get('window').width - 60)/2, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={styles.periodText}>CVV</Text>
                        <Input
                            defaultValue=''
                            secureTextEntry={true}
                            inputContainerStyle={styles.inputPeriod}
                            inputStyle={styles.inputPeriodStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='1234'
                            placeholderTextColor={'#B7B7B7'}
                            onChangeText={(text) => {setCVV(text)}}
                        />
                    </View>
                </View>
                <View style={[styles.goBack, {marginTop: 30}]}>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputName}
                        inputStyle={styles.inputNameStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='Your name and Surname'
                        placeholderTextColor={'#B7B7B7'}
                        onChangeText={(text) => {setName(text)}}
                    />
                </View>
                <View style={[styles.goBack, {marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <Text style={styles.saveCardText}>Save card data for future payments</Text>
                    <Switch
                        trackColor={'#D7F2FA'}
                        thumbColor={'#59C7EA'}
                        value={cardFuture}  
                        onValueChange ={(cardFuture)=> setCardFuture(cardFuture)}
                    />
                </View>
                <View style={styles.processConfirm}>
                    <RoundButton title={'Process Confirm'} onPress={() => submitProcessConfirm()} />
                </View>
            </View>
        </ScrollView>
    );
}

export default PaymentDataScreen;

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
    paymentText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    paymentValue: {
        fontSize: 48,
        fontWeight: '700',
        color: '#59C7EA',
    },
    paymentMethodText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000',
    },
    paymentItem: {
        width: 130,
        height: 42,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    inputCardNumber: {
        width: Dimensions.get('window').width - 60,
        height: 42,
        backgroundColor: '#F5F3F3',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 3,
    },
    inputCardNumberStyle: {
      fontSize: 20,
      fontWeight: '500',
      fontFamily: 'Open Sans',
      color: 'white'
    },
    periodText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    inputPeriod: {
        width: (Dimensions.get('window').width - 60) / 2 - 15,
        height: 42,
        backgroundColor: '#F5F3F3',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 3,
        position: 'relative',
        right: 5,
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    inputPeriodStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Open Sans',
        color: 'white'
    },
    inputName: {
        width: Dimensions.get('window').width - 60,
        height: 42,
        backgroundColor: '#F5F3F3',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputNameStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Open Sans',
        color: 'white'
    },
    saveCardText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    processConfirm: {
        width: Dimensions.get('window').width - 60,
        marginTop: 15,
        alignSelf: 'center'
    },
})