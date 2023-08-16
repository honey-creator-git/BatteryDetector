import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Checkbox from '../../components/CustomCheckBox';
import RoundButton from '../../components/CustomButton';
import Images from '../../assets/Images';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleCheckboxChange = () => {
        if(selectedIndex === 1) setSelectedIndex(0)
        else setSelectedIndex(1)
    };
    const submitLogin = () => {
        if(email === '' || password === '') {
            showMessage({
                message: "Email or Password can't be blank"
            });
            return;
        } else {
            // setLoading(true);
            props.navigation.navigate("Home");
        }
    }
    return (
        <View style={styles.loginContainer}>
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
                            style={styles.socialImage}
                            source={Images.google_icon}
                            resizeMode='stretch'
                        />
                        <View style={{marginLeft: 10}}><Text style={styles.socialLoginText}>Login with Google</Text></View>
                    </TouchableOpacity>
                </View>
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
    }
})