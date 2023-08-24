import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-native-paper';
import Modal from "react-native-modal";
import RoundButton from '../components/CustomButton';
import Images from '../assets/Images';
import { userActions } from '../../redux/actions/userActions';
import I18n from './../../i18n/i18n';

const ConnectionStateScreen = (props) => {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const handleConnectionConfirm = () => {
        dispatch(userActions.logout(props.navigation));
    }
    useEffect(() => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 4000);
    }, []);
    return (
        <ScrollView>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTextStyle}>{I18n.t('chargedFull')}</Text>
                </View>
            </Modal>
            <View style={styles.paymentScreenContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                </View>
                <View style={[styles.goBack, {marginTop: 10}]}><Text style={styles.connectionStateText}>{I18n.t('connectionState')}</Text></View>
                <View style={[styles.goBack, {marginTop: 100}]}><Text style={styles.completionText}>{I18n.t('completion')}</Text></View>
                <View>
                    <ProgressBar
                        progress={1}
                        color={'#59C7EA'}
                        style={styles.connectionStateProgress}
                    />
                </View>
                <View style={styles.connectionStateConfirm}>
                    <RoundButton title={I18n.t('end')} onPress={() => handleConnectionConfirm()} />
                </View>
            </View>
        </ScrollView>
    );
}

export default ConnectionStateScreen;

const styles = StyleSheet.create({
    paymentScreenContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
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
    connectionStateText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#161B1D'
    },
    completionText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    connectionStateProgress: {
        width: Dimensions.get('window').width - 60,
        height: 10,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
    },
    connectionStateConfirm: {
        width: Dimensions.get('window').width - 60,
        marginTop: 350,
        alignSelf: 'center'
    },
    modalContainer: {
        width: Dimensions.get('window').width - 30,
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