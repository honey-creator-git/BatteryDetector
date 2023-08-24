import React, {useRef, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView , { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RoundButton from '../../components/CustomButton';
import { useColorSchemeListener } from '../../../utils/useColorSchemeListener'
import I18n from './../../../i18n/i18n';

const MapScreen = (props) => {
    const colorScheme = useColorSchemeListener();
    const [charge, setCharge] = useState('charged');
    const defaultColor = colorScheme === 'dark' ? '#eee' : '#333';
    const [users, setUsers] = useState(0);
    const chargeId = props.route.params.id;
    const location = props.route.params.location;
    const back = props.route.params.back;
    const batteryUsers = props.route.params.batteryUsers;
    const name = props.route.params.name;
    const ip = props.route.params.ip;
    const edit = props.route.params.edit;
    var defaultUsersLength = 0;
    if(batteryUsers != null) {
        defaultUsersLength = batteryUsers.length;
        console.log("length => ", defaultUsersLength);
    }
    const mapRef = useRef<MapView>(null);
    const handleCharge = () => {
        if(charge == 'charged') setCharge('unCharged')
        else setCharge('charged')
    }
    const handleGoBack = () => {
        props.navigation.goBack();
    }
    const viewHistory = () => {
        if (defaultUsersLength == 0) {
            alert(I18n.t('noUser'));
        } else {
            props.navigation.navigate('History', { ip: ip, batteryUsers, batteryUsers });
        }        
    }
    const [selectedLocation, setSelectedLocation] = useState(location ? location : {
        latitude: 37.78825,
        longitude: -122.4324
    });
    const [coordinate, setCoordinate] = useState(location ? location : {
        latitude: 37.78825,
        longitude: -122.4324
    })
    const handleSelectLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log("Lattitude => ", latitude);
        console.log("Longitude => ", longitude);
        props.navigation.navigate("AddCharge", { chargeId: chargeId, chargeName: name, chargeIp: ip, latitude: latitude, longitude: longitude, batteryUsers: batteryUsers, edit: edit })
        setSelectedLocation({ latitude, longitude });
    };

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity 
                  onPress={()=>{
                    
                    props.navigation.navigate(back, {location: {
                        lat: selectedLocation?.latitude,
                        lng: selectedLocation?.longitude
                    }})
                  }}
                  style={{alignItems: 'center', marginRight: 8, flexDirection: 'row' }}
                  >
                    <MaterialIcons name='done' size={32} color={defaultColor} />
                    <Text style={{color: defaultColor}}>Done</Text>
                  </TouchableOpacity>
          ),
        });
    }, [props.navigation, selectedLocation]);

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always'
            style={{ flex:1 }}  
        >
            <View style={styles.mapContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBack()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.mapShowContainerStyle, { marginTop: 20 }]}>
                    <Text style={styles.mapText}>{I18n.t('map')}</Text>
                    <View style={styles.mapStyle}>
                        <MapView 
                            useRef={mapRef}
                            style={styles.map}
                            initialRegion={{
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={handleSelectLocation}
                            >
                            {selectedLocation && (
                                <Marker coordinate={selectedLocation} title="Selected Location" />
                            )}
                        </MapView>
                    </View>
                </View>
                <View style={[styles.chargeContainer, {position: 'absolute', top: 500}]}>
                    <View><Text style={styles.chargeText}>{I18n.t('charge')}</Text></View>
                    <RadioButton value={charge} status={ charge === 'charged' ? 'checked' : 'unchecked' } onPress={() => handleCharge()} color='#59C7EA' />
                </View>
                <View style={[styles.chargeContainer, {marginTop: 20, position: 'absolute', top: 550}]}>
                    <View><Text style={styles.chargeText}>{I18n.t('users')}</Text></View>
                    <Input
                        defaultValue={defaultUsersLength.toString()}
                        inputContainerStyle={styles.inputUsers}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputUsersStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder='000000'
                        placeholderTextColor={'#A5A5A5'}
                        onChangeText={(text) => {setUsers(text)}}
                    />
                </View>
                <View style={[styles.historyBtn, {position: 'absolute', top: 620}]}>
                    <RoundButton title={I18n.t('viewHistory')} onPress={() => viewHistory()} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
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
        backgroundColor: '#F5F3F3',
        marginVertical: 15,

        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        top: 20,
        left: 30
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
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        position: 'relative',
        top: 10,
    },
    inputContainerStyle: {
        width: 143,
        height: 29,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    inputUsersStyle: {
        fontWeight: '400',
        fontSize: 12,
    },
    historyBtn: {
        width: Dimensions.get('window').width - 60,
        marginTop: 30,
        alignSelf: 'center'
    }, 
    
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    }, 
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})