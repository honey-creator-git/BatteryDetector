import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Switch, Image, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import RoundButton from '../../components/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { chargeActions } from '../../../redux/actions/chargeActions';

const AddCharge = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user["token"]);
    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [latLon, setLatLon] = useState('');
    const [edit, setEdit] = useState(false);
    const [chargeId, setChargeId] = useState('');
    const [batteryUsers, setBatteryUsers] = useState([]);
    const handleGoBak = () => {
        props.navigation.goBack()
    }
    const saveCharge = () => {
        if(edit == false) {
            dispatch(chargeActions.addNewCharge(name, ipAddress, latLon, token, props.navigation));
        } else if (edit == true) {
            dispatch(chargeActions.updateChargeWithNameIpLocation(chargeId, name, ipAddress, latLon, batteryUsers, token, props.navigation));
        }
    }
    const handleLocation = () => {
        if (latLon != "") {
            const latlon = latLon.split(":");
            const latitude = latlon[0];
            const longitude = latlon[1];
            props.navigation.navigate('Map', { id:chargeId, name: name, ip: ipAddress, location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }, back: "ChargeSearch", batteryUsers: batteryUsers });
        } else {
            props.navigation.navigate('Map', { id:chargeId, name: name, ip: ipAddress, location: { latitude: 37.78825, longitude: -122.4324 }, back: "ChargeSearch", batteryUsers: batteryUsers });
        }
    }
    useEffect(() => {
        const chargeName = props.route.params.chargeName;
        setName(chargeName);
        const chargeIp = props.route.params.chargeIp;
        setIpAddress(chargeIp);
        const chargelatLon = props.route.params.chargeLatLon;
        setLatLon(chargelatLon);
        const chargeEdit = props.route.params.edit;
        setEdit(chargeEdit);
        const users = props.route.params.batteryUsers;
        setBatteryUsers(users);
        if(!!props.route.params.latitude && !!props.route.params.longitude) {
            const latitude = props.route.params.latitude;
            const longitude = props.route.params.longitude;
            const location = latitude + ":" + longitude;
            setLatLon(location);
        }
        if(chargeEdit == true) {
            selectedChargeId = props.route.params.chargeId;
            setChargeId(selectedChargeId);
        }
        if(!!props.route.params.update) {
            if(props.route.params.update == "success") {
                alert("Charge has been updated successfully!");
            }
        }
    }, [props.route.params])
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always'
            style={{ flex:1 }}  
        >
            <View style={styles.addChargeStyle}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.chargeAddItemStyle, { marginTop: 20 }]}>
                        <Text style={styles.nameText}>Name</Text>
                        <Input
                            defaultValue={name}
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
                        <Text style={styles.nameText}>IP Address</Text>
                        <Input
                            defaultValue={ipAddress}
                            inputContainerStyle={styles.inputName}
                            inputStyle={styles.inputNameStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='000.000.000.000'
                            placeholderTextColor={'#97999B'}
                            onChangeText={(text) => {setIpAddress(text)}}
                        />
                </View>
                <View style={[styles.chargeAddItemStyle, { marginTop: 30 }]}>
                        <Text style={styles.nameText}>Lat , Lon</Text>
                        <Input
                            defaultValue={latLon}
                            inputContainerStyle={styles.inputName}
                            inputStyle={styles.inputNameStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            placeholder='000 : 000'
                            placeholderTextColor={'#97999B'}
                            onChangeText={(text) => {setLatLon(text)}}
                            onPressIn={() => handleLocation()}
                        />
                </View>
                <View style={styles.saveBtn}>
                {
                    edit == true ?
                    <RoundButton title={'Edit'} onPress={() => saveCharge()} />
                    :
                    <RoundButton title={'Save'} onPress={() => saveCharge()} />
                }
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default AddCharge;

const styles = StyleSheet.create({
    addChargeStyle: {
        width: '100%',
        height: Dimensions.get("window").height,
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