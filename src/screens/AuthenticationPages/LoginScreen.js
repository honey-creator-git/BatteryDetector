import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";
import Checkbox from '../../components/CustomCheckBox';
import RoundButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import Images from '../../assets/Images';
import { userActions } from '../../../redux/actions/userActions';

const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const handleCheckboxChange = () => {
        if(selectedIndex === 1) setSelectedIndex(0)
        else setSelectedIndex(1)
    };
    useEffect(() => {
        if (props.route.params) {
            // setLoading(false);
            const error = props.route.params.err;
            if (error == "invalid") {
                showMessage({
                    message: "UserName or Password is incorrect."
                });
            } else if (error == "token is expired") {
                showMessage({
                    message: "User Token has been expired."
                });
            }
            const udpConnection = props.route.params.udpConnection;
            const role = props.route.params.role;
            console.log("UDP Connection => ", udpConnection);
            console.log("User Role => ", role);
            if(udpConnection == true) {
                // alert("Connection UDP Successfully !")
                // setModalVisible(true);
                // setTimeout(() => {
                    // setModalVisible(false);
                    if(role === 'user') {
                        props.navigation.navigate("Selection");
                    } else if(role === 'admin') {
                        props.navigation.navigate("ChargeSearch")
                    }
                // }, 3000)
            }
        }
    }, [props.route.params])

    const submitLogin = () => {
        if(email === '' || password === '') {
            showMessage({
                message: "Email or Password can't be blank"
            });
            return;
        } else {
            // setLoading(true);
            // for(let i = 0; i < 101; i++) {
            //     setProgress(i);
            // }
            // setTimeout(() => {
            //     dispatch(userActions.login(email, password, props.navigation));
            //     setLoading(false);
            // }, 5000);
            dispatch(userActions.login(email, password, props.navigation));
        }
    }
    return (
        <View style={styles.loginContainer}>
            <View>
                {/* { loading && <LoadingOverlay progress={progress} /> } */}
                {/* <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextStyle}>Connection UDP Successfully!</Text>
                    </View>
                </Modal> */}
                <ScrollView>
                    <View style={styles.loginTitle}>
                        <Text style={styles.loginText}>Login 👋</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            defaultValue=''
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={"none"}
                            keyboardType={'email-address'}
                            placeholder='Email'
                            placeholderTextColor={'#97999B'}
                            onChangeText={(text) => {setEmail(text)}}
                            onSubmitEditing={() => {}}
                        />
                        <Input
                            defaultValue=''
                            secureTextEntry={true}
                            containerStyle={{width: '100%'}}
                            inputContainerStyle={styles.inputContainerStylePassword}
                            inputStyle={styles.inputStyle}
                            placeholder='Password'
                            placeholderTextColor={'#97999B'}
                            onChangeText={(text) => {setPassword(text)}}
                            ref={ref => {}}
                        />
                        <View style={styles.forgotPasswordContainer}>
                            <Checkbox
                                id={1}
                                btnstyles={styles.btnstyles}
                                btnstylesSelect={styles.btnstylesSelect}
                                selectedIndex={selectedIndex}
                                onCheckboxChange={handleCheckboxChange}
                            />
                            <TouchableOpacity 
                                onPress={() => {}}
                            >
                                <Text style={styles.forgetTxt}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.LoginBtn}>
                            <RoundButton title={'Login'} onPress={() => submitLogin()} />
                        </View>
                        <View style={styles.orloginWithContainer}>
                            <TouchableOpacity style={styles.orloginWithContainer}>
                                <Image
                                    source={Images.google_icon}
                                    resizeMode='stretch'
                                />
                                <View style={{marginLeft: 10}}><Text style={styles.socialLoginText}>Login with Google</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>     
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loginTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'medium'
    },
    inputContainer: {
        marginVertical: 20,
        width: '100%',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'center'
    },    
    inputContainerStyle: {
        width: '100%',
        height: 48,
        backgroundColor: '#F3F4F7',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    inputContainerStylePassword: {
        width: '100%',
        height: 48,
        backgroundColor: '#F3F4F7',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        // position: 'relative',
        // bottom: 10,
    },
    inputStyle: {
      fontSize: 14,
      fontFamily: 'Open Sans'
    },
    forgotPasswordContainer: {
        width: Dimensions.get('window').width - 50,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    forgetTxt: {
      color: '#3BA1DF',
      fontSize: 14,
    },
    btnstyles: {
        height: 20,
        width: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'transparent',
        borderRadius: 3,
    },
    btnstylesSelect: {
        height: 20,
        width: 20,
        marginRight: 8,
        backgroundColor: '#59C7EA',
        borderRadius: 3,
    },
    LoginBtn: {
        width: Dimensions.get('window').width - 50,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 15,
    },
    orloginWithContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    socialLoginText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black'
    },
    modalContainer: {
        width: Dimensions.get('window').width - 60,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#2AC062',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    modalTextStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})