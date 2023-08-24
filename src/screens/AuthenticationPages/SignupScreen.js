import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showMessage } from "react-native-flash-message";
import Checkbox from '../../components/CustomCheckBox';
import Modal from "react-native-modal";
import RoundButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import Images from '../../assets/Images';
import { userActions } from '../../../redux/actions/userActions';
import I18n  from './../../../i18n/i18n';

const SignupScreen = (props) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (props.route.params) {
            setLoading(false);
            const error = props.route.params.err;
            if (error) {
                showMessage({
                message: "Email has already been taken."
                });
            }
            const udpConnection = props.route.params.udpConnection;
            const role = props.route.params.role;
            if(udpConnection == true) {
                // alert("Connection UDP Successfully !")
                // setModalVisible(true);
                // setTimeout(() => {
                    // setModalVisible(false);
                    // if(role === 'user') {
                props.navigation.navigate("Login");
                    // }
                // }, 3000);
            }
        }
    }, [props.route.params])

    const submitRegister = () => {
        if (firstName == '') {
            showMessage({
              message: "First Name can't be blank",
            });
            return;
        }
        if (lastName == '') {
            showMessage({
              message: "Last Name can't be blank",
            });
            return;
        }
        if (email == '') {
            showMessage({
              message: "Email can't be blank",
            });
            return;
        } else if (email !== '') {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (email.match(validRegex)) { 
            } else {
                showMessage({
                    message: "Invalid Email Address.\nPlease input a valid email address."
                });
                return;
            }
        }
        if (password == '') {
            showMessage({
              message: "Password can't be blank",
            });
            return;
        } else if (password !== '') {
            var len = password.length;
            if (len < 6) {
              showMessage({
                message: "Password should be at least 6 letters."
              });
              return;
            }
        }
        if (password !== confirmPassword) {
            showMessage({
                message: "Check Confirm Password again"
            });
            return;
        }
        // setLoading(true);
        // for(let i = 0; i < 101; i++) {
        //     setProgress(i);
        // }
        // setTimeout(() => {
        dispatch(userActions.register(firstName, lastName, email, password, props.navigation));
            // setLoading(false);
        // }, 5000);
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always'
            style={{ flex:1 }}  
        >
            <View style={styles.loginContainer}>
                {/* { loading && <LoadingOverlay /> } */}
                {/* <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextStyle}>Connection UDP Successfully!</Text>
                    </View>
                </Modal> */}
                <View style={styles.loginTitle}>
                    <Text style={styles.loginText}>{I18n.t('signupTitle')} 👋</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder={I18n.t('firstName')}
                        placeholderTextColor={'#97999B'}
                        onChangeText={(text) => {setFirstName(text)}}
                    />
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        placeholder={I18n.t('lastName')}
                        placeholderTextColor={'#97999B'}
                        onChangeText={(text) => {setLastName(text)}}
                    />
                    <Input
                        defaultValue=''
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                        keyboardType={'email-address'}
                        placeholder={I18n.t('email')}
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
                        placeholder={I18n.t('password')}
                        placeholderTextColor={'#97999B'}
                        onChangeText={(text) => {setPassword(text)}}
                        ref={ref => {}}
                    />                
                    <Input
                        defaultValue=''
                        secureTextEntry={true}
                        containerStyle={{width: '100%'}}
                        inputContainerStyle={styles.inputContainerStylePassword}
                        inputStyle={styles.inputStyle}
                        placeholder={I18n.t('confirmPassword')}
                        placeholderTextColor={'#97999B'}
                        onChangeText={(text) => {setConfirmPassword(text)}}
                        ref={ref => {}}
                    />
                    <View style={styles.LoginBtn}>
                        <RoundButton title={I18n.t('tabSignup')} onPress={() => submitRegister()} />
                    </View>
                    <View style={styles.orloginWithContainer}>
                        <TouchableOpacity style={styles.orloginWithContainer}>
                            <Image
                                style={styles.socialImage}
                                source={Images.google_icon}
                                resizeMode='stretch'
                            />
                            <View style={{marginLeft: 10}}><Text style={styles.socialLoginText}>{I18n.t('loginWithGoogle')}</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    },
    inputStyle: {
      fontSize: 14,
      fontFamily: 'Open Sans'
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