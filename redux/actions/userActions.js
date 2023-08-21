import axios from "axios";
import { userConstants } from '../constants';
import { chargeConstants } from "../constants";
// import { ENDPOINT } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ENDPOINT = "http://10.0.2.2:6060/api/v1"

export const userActions = {
    login,
    register,
    logout
}

function login(username, password, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + '/user/signin', {'Email': username, 'Password': password})
        .then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                const userData = data["payload"]["data"];
                const userToken = data["payload"]["token"];
                dispatch({ type: userConstants.SET_USER, userData: userData, userToken: userToken});
                axios.get(
                    ENDPOINT + '/charge/getAll?results=10&page=1', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    },
                }).then((rest) => {
                    const { data } = rest
                    const charges = data["payload"];
                    dispatch({ type: chargeConstants.SET_CHARGES, chargeData: charges });
                    if(userData["role"] == "User") {
                        navigation.navigate('Home');
                    } else {
                        navigation.navigate('ChargeSearch');
                    }
                })
            } else if(data["status"] == false){
                navigation.navigate('Login', {err: "invalid"});
            }
        }).catch(err=>{
            navigation.navigate('Login', {err: "invalid"})
        });
    };
}

function register(firstName, lastName, email, password, navigation) {
    return dispatch => {
        axios.post(
            ENDPOINT + '/user/create',
            {
                'FirstName': firstName,
                'LastName': lastName,
                'Email': email,   
                'Password': password
            }
        ).then((result) => {
            const { data } = result
            if(data["status"] == true) {
                const userData = data["payload"]["data"];
                const userToken = data["payload"]["token"];
                dispatch({ type: userConstants.SET_USER, userData: userData, userToken: userToken });
                axios.get(
                    ENDPOINT + '/charge/getAll?results=10&page=1', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    },
                }).then((rest) => {
                    const { data } = rest
                    const charges = data["payload"];
                    dispatch({ type: chargeConstants.SET_CHARGES, chargeData: charges });
                    navigation.navigate('Home');
                })
            } else if(data["status"] == false) {
                navigation.navigate('Signup', {err: "invalid"});
            }
        }).catch(err => {
            navigation.navigate('Signup', {err: 'invalid'});
        });
    };
}

function logout(navigation) {
    return dispatch => {
        // AsyncStorage.removeItem('user')
        navigation.navigate("Login");
        dispatch({ type: userConstants.LOGOUT });
    };
}