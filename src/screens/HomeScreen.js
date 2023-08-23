import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet, Dimensions, DeviceEventEmitter, NativeModules, Modal, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { ProgressBar, RadioButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import RoundButton from '../components/CustomButton';
import LoadingOverlay from '../components/LoadingOverlay';
import { chargeActions } from '../../redux/actions/chargeActions';

var BatteryManager = NativeModules.BatteryManager;

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const [automation, setAutomation] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(25);
    const [charging, setCharging] = useState(false);
    const [showGateway, setShowGateway] = useState(false);
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState("#000");
    const [chargeItems, setChargeItems] = useState([]);
    const [selectedCharge, setSelectedCharge] = useState(null);
    const [normalCharge, setNormalCharge] = useState(true);
    const [fastCharge, setFastCharge] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [chargeModal, setChargeModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const charges = useSelector((state) => state.charge["charges"]);
    const token = useSelector((state) => state.user["token"]);
    const currentUser = useSelector((state) => state.user["user"]);

    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const submitPayment = () => {
        // props.navigation.navigate('Payment');
        if (selectedCharge === null) {
            alert("Please select a charge.");
        } else  {
            setShowGateway(true)
        }
    }
    const handleChargeSelect = (selectItem) => {
        setSelectedCharge(selectItem);
        const updateCharge = charges.filter((item, index) => item["ip"] == selectItem);
        const updateChargeId = updateCharge[0]["id"];
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        const touchedAt = year + "/" + month + "/" + date + " " + hours + ":" + min;
        
        const userInfo = {
            "firstName" : currentUser["firstName"],
            "lastName" : currentUser["lastName"],
            "touchedAt" : touchedAt
        }
        var batteryUsers = [userInfo];
        if (updateCharge[0]["batteryUsers"] != null) {
            const checkExists = updateCharge[0]["batteryUsers"].filter((item) => item["firstName"] == userInfo["firstName"]);
            if(checkExists.length == 0) {
                batteryUsers = updateCharge[0]["batteryUsers"].concat(batteryUsers)
                dispatch(chargeActions.updateChargeForBatteryUsers(updateChargeId, batteryUsers, token));
            }            
        } else {
            dispatch(chargeActions.updateChargeForBatteryUsers(updateChargeId, batteryUsers, token));
        }

        if (batteryLevel === 100) {
            // setChargeModal(false);
            props.navigation.navigate("ConnectoinState");
        } else {
            alert("\nPLEASE WAIT\n\nDO NOT UNPLUG DEVICE\n\nMAKE SURE DEVICE IS TURNED ON");
            setLoading(true);
            for(let i = 0; i < 101; i++) {
                setProgress(i);
            }
            setTimeout(() => {
                setLoading(false);
            }, 7000);
        }
    }
    const onBatteryStatus = (info) => {
        // setBatteryLevel(info.level);
        setCharging(info.isPlugged);

        if(info.level == 100 && selectedCharge !== null) {
            props.navigation.navigate("ConnectoinState");
        }
    }
    const handleAutomation = (prop) => {
        setAutomation(prop);
        if (prop == true && batteryLevel === 100 && selectedCharge != null) {
            props.navigation.navigate("ConnectoinState");
        }
        // if (prop == true && selectedCharge !== null) {
        //     setShowGateway(true);
        // }
        if (batteryLevel < 30) {
            alert("\nBattery is Low!\n\nCONNECT CHARGE TO YOUR DEVICE.")
        }
    }
    useEffect(() => {
        setTimeout(() => {
            if(batteryLevel < 30) {
                alert("\nBattery is Low!\n\nCONNECT CHARGE TO YOUR DEVICE.")
            }
        }, 500);
        BatteryManager.updateBatteryLevel(function(info){
            this._subscription = DeviceEventEmitter.addListener('BatteryStatus', onBatteryStatus(info));
            // setBatteryLevel(info.level);
            setCharging(info.isPlugged);
        }.bind(this));
        let ips = charges.map((charge, index) => {
            return charge["ip"]
        });
        setChargeItems(ips);
        // setTimeout(() => {
        //     if (selectedCharge === null) {
        //         alert("Choose a charge in the list of charges.");
        //     }
        // }, 500);
    }, []);
    useEffect(() => {
        if(batteryLevel == 100) {
            props.navigation.navigate("ConnectoinState");
        }
    }, [batteryLevel]);
    const onMessage = (e) => {
        let data = e.nativeEvent.data;
        setShowGateway(false);

        let payment = JSON.parse(data);
        if (payment.status === "COMPLETED") {
            alert("PAYMENT MADE SUCCESSFULLY");
        } else {
            alert("PAYMENT FAILED. PLEASE TRY AGAIN");
        }
    }
    const handleNormalCharge = () => {
        setNormalCharge(!normalCharge);
        if(normalCharge == true) {
            setFastCharge(true)
        } else {
            setFastCharge(false)
        }
    }
    const handleFastCharge = () => {
        setFastCharge(!fastCharge);
        if(fastCharge == true) {
            setNormalCharge(true)
        } else {
            setNormalCharge(false)
        }
    }
    // const countries = ["192.173.62.115", "192.155.42.18", "163.18.229.135", "195.125.63.58"]
    return (
        <ScrollView>
            <View style={styles.homeScreenContainer}>
                { loading && <LoadingOverlay progress={progress} /> }
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.homeText}>Home</Text></View>
                <View style={[styles.goBack, {marginTop: 5}]}><Text style={styles.selectChargeText}>Select Charge place</Text></View>
                <View style={[styles.goBack, {marginTop: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                    { chargeItems.length != 0 && <SelectDropdown
                        searchPlaceHolder={'Select a charge'}
                        buttonStyle={styles.buttonStyle}
                        buttonTextStyle={styles.buttonTextStyle}
                        dropdownStyle={styles.dropdownStyle}
                        rowStyle={styles.rowStyle}
                        data={chargeItems}
                        onSelect={(selectedItem, index) => handleChargeSelect(selectedItem)}
                        buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                        rowTextForSelection={(item, index) => {return item}}
                        renderDropdownIcon={() => <FontAwesomeIcon icon={faCaretDown} size={15} style={{color: '#B7B7B7'}} />}
                    />}
                </View>
                {/* {
                    chargeModal && 
                    <Modal
                        style={{zIndex: 10}}
                        visible={chargeModal}
                        onDismiss={() => setChargeModal(false)}
                        onRequestClose={() => setChargeModal(false)}
                        transparent
                    >
                        <View style={styles.chargeModalContainer}>
                            <View style={styles.chargeModalStyle}>
                                <Text>PLEASE WAIT</Text>
                                <Text>DO NOT UNPLUG  DEVICE</Text>
                                <Text>MAKE SURE DEVICE IS TURNED ON</Text>
                            </View>
                        </View>
                    </Modal>
                } */}
                {showGateway ? (
                    <Modal
                        visible={showGateway}
                        onDismiss={() => setShowGateway(false)}
                        onRequestClose={() => setShowGateway(false)}
                        animationType={'fade'}
                        transparent
                    >
                        <View style={styles.webViewCon}>
                            <View style={styles.wbHead}>
                                <TouchableOpacity
                                    style={{padding: 13}}
                                    onPress={() => setShowGateway(false)}>
                                    <Feather name={'x'} size={24} />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#00457C',
                                    }}
                                >
                                    PayPal GateWay
                                </Text>
                                <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                                    <ActivityIndicator size={24} color={progClr} />
                                </View>
                            </View>
                            <WebView
                                source={{uri: 'https://my-pay-web.web.app/'}}
                                style={{flex: 1}}
                                onLoadStart={() => {
                                    setProg(true);
                                    setProgClr('#000');
                                }}
                                onLoadProgress={() => {
                                    setProg(true);
                                    setProgClr('#00457C');
                                }}
                                onLoadEnd={() => {
                                    setProg(false);
                                }}
                                onLoad={() => {
                                    setProg(false);
                                }}
                                onMessage={onMessage}
                            />
                        </View>
                    </Modal>
                ) : null}
                <View style={styles.divider}></View>
                <View style={[styles.batteryStatusHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.batteryTitle}>Battery Status:</Text><Text style={[styles.batteryTitle, {marginLeft: 5}]}>{batteryLevel}%</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.automation}>Automation</Text>
                        <Switch
                            trackColor={'#D7F2FA'}
                            thumbColor={'#59C7EA'}
                            value={automation}  
                            onValueChange ={(automation)=> handleAutomation(automation)}
                        />
                    </View>
                </View>
                <View>
                    <ProgressBar
                        progress={batteryLevel/100}
                        color={ batteryLevel < 30 ? '#FF2414' : 30 <= batteryLevel < 50  ? '#59C7EA' : '#59C7EA'}
                        style={styles.batteryProgress}
                    />
                </View>
                <View style={styles.divider}></View>
                {/* <View style={styles.batteryStatusHeader}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.price}>Price:</Text><Text style={[styles.price, {marginLeft: 5}]}>$1</Text></View>
                </View> */}
                <View style={[styles.batteryStatusHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.batteryTitle}>Normal Charge:</Text><Text style={[styles.batteryTitle, {marginLeft: 5}]}>$1</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={normalCharge} status={ normalCharge === true ? 'checked' : 'unchecked' } onPress={() => handleNormalCharge()} color='#59C7EA' />
                    </View>
                </View>
                <View style={[styles.batteryStatusHeader, {marginTop: 40}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={styles.batteryTitle}>Fast Charge:</Text><Text style={[styles.batteryTitle, {marginLeft: 5}]}>$2</Text></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RadioButton value={fastCharge} status={ fastCharge === true ? 'checked' : 'unchecked' } onPress={() => handleFastCharge()} color='#59C7EA' />
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.payBtn}>
                    <RoundButton title={'Pay Now'} onPress={() => submitPayment()} />
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeScreenContainer: {
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
    homeText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    selectChargeText: {
        fontSize: 14,
        color: '#000000'
    },
    buttonStyle: {
        width: Dimensions.get('window').width - 60,
        height: 42,
        backgroundColor: '#F5F3F3',
        borderRadius: 3,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#B7B7B7',
    },
    dropdownStyle: {
        backgroundColor: '#F3F4F7',
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
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        zIndex: 25,
        elevation: 2,
    },
    // chargeModalContainer: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     opacity: 0.5,
    //     backgroundColor: '#C9FFD5',
    //     zIndex: 10,
    // },
    // chargeModalStyle: {
    //     width: Dimensions.get('window').width - 60,
    //     height: 200,
    //     backgroundColor: '#79FF61',
    //     borderRadius: 20,
    //     zIndex: 10,
    //     alignContent: 'center',
    //     justifyContent: 'center'
    // }
})