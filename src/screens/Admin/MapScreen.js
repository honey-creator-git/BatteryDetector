import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RoundButton from '../../components/CustomButton';

const MapScreen = (props) => {
    const [charge, setCharge] = useState('charged');
    const [users, setUsers] = useState(0);
    const handleCharge = () => {
        if(charge == 'charged') setCharge('unCharged')
        else setCharge('charged')
    }
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const viewHistory = () => {
        console.log("View History !");
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always'
            style={{ flex:1 }}  
        >
            <View style={styles.mapContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.mapShowContainerStyle, { marginTop: 20 }]}>
                    <Text style={styles.mapText}>Map</Text>
                    <View style={styles.mapStyle}></View>
                </View>
                <View style={styles.chargeContainer}>
                    <View><Text style={styles.chargeText}>Charge</Text></View>
                    <RadioButton value={charge} status={ charge === 'charged' ? 'checked' : 'unchecked' } onPress={() => handleCharge()} color='#59C7EA' />
                </View>
                    <View style={[styles.chargeContainer, {marginTop: 20}]}>
                        <View><Text style={styles.chargeText}>Users</Text></View>
                        <Input
                            defaultValue=''
                            inputContainerStyle={styles.inputUsers}
                            inputStyle={styles.inputUsersStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='000000'
                            placeholderTextColor={'white'}
                            onChangeText={(text) => {setUsers(text)}}
                        />
                    </View>
                <View style={styles.historyBtn}>
                    <RoundButton title={'View History'} onPress={() => viewHistory()} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    mapContainer: {
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
    mapShowContainerStyle: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    mapText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000000',
    },
    mapStyle: {
        height: 370,
        width: Dimensions.get('window').width - 60,
        alignSelf: 'center',
        backgroundColor: 'gray',
        marginVertical: 15,
    },
    chargeContainer: {
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chargeText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000000',
        marginRight: 30,
        width: 70,
        alignSelf: 'flex-start'
    },
    inputUsers: {
        width: 143,
        height: 29,
        backgroundColor: 'gray',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
        top: 10,
    },
    inputUsersStyle: {
        fontWeight: '400',
        fontSize: 12,
        color: 'white',
    },
    historyBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 30,
        alignSelf: 'center'
    },
})