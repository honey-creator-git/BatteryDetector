import axios from "axios";
import { chargeConstants } from "../constants";
// import { ENDPOINT } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ENDPOINT = "http://10.0.2.2:6060/api/v1"

export const chargeActions = {
    addNewCharge,
    updateChargeForBatteryUsers,
    updateChargeWithNameIpLocation
}

function addNewCharge(name, ip, latlon, token, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + '/battery/add',
            {
                "Name": name,
                "Ip": ip,
                "LatLon": latlon
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                axios.get(
                    ENDPOINT + '/charge/getAll?results=10&page=1', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }).then((rest) => {
                    const { data } = rest
                    const charges = data["payload"];
                    dispatch({ type: chargeConstants.SET_CHARGES, chargeData: charges });
                    navigation.navigate('ChargeSearch');
                })
            } else if(data["status"] == false){
                navigation.navigate('Signup', {err: "invalid"});
            }
        }).catch(err=>{
            navigation.navigate('Signup', {err: "invalid"})
        });
    };
}

function updateChargeForBatteryUsers(id, batteryUsers, token) {
    return dispatch => {
        axios.post(ENDPOINT + '/charge/edit/' + id,
            {
                "batteryUsers": batteryUsers
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then((result)=>{
            const { data } = result
        }).catch(err=>{
            navigation.navigate('Signup', {err: "invalid"})
        });
    };
}

function updateChargeWithNameIpLocation(id, name, ip, latlon, token, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + '/charge/edit/' + id,
            {
                "Name": name,
                "Ip": ip,
                "Latlon": latlon
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                navigation.navigate("AddCharge", {update: "success"})
            }
        }).catch(err=>{
            navigation.navigate('Signup', {err: "invalid"})
        });
    };
}