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
                    console.log("Fetched All Charges => ", data["payload"]);
                    const charges = data["payload"];
                    dispatch({ type: chargeConstants.SET_CHARGES, chargeData: charges });
                    navigation.navigate('ChargeSearch', { update: '', addCharge: true })
                });
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

function updateChargeWithNameIpLocation(id, name, ip, latlon, users, token, navigation) {
    return dispatch => {
        console.log("Charge ID => ", id);
        console.log("Charge Name => ", name);
        console.log("Charge IP => ", ip);
        console.log("Latlon => ", latlon);
        console.log("Battery Users => ", users);
        axios.post(ENDPOINT + '/charge/edit/' + id,
            {
                "Name": name,
                "IpAddress": ip,
                "Latlon": latlon,
                "batteryUsers": users
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                navigation.navigate("ChargeSearch", {update: "success", addCharge: false})
            }
        }).catch(err => {
            console.log("Error => ", err);
            navigation.navigate('Signup', {err: "invalid"})
        });
    };
}