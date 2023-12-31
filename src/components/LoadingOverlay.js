import React from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import AnimatedProgressWheel from 'react-native-progress-wheel';

const LoadingOverlay = ({ progress = 0 }) => {

    return (
        <View style={styles.container}>
           <View style={styles.checkContainer}><FontAwesomeIcon icon={faCircleCheck} size={100} color="#59C7EA" /></View>

            <AnimatedProgressWheel
                progress={progress}
                animateFromValue={0}
                duration={7000}
                color={'white'}
                fullColor={'#59C7EA'}
                size={150}
                width={15}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center", 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 40, 
        zIndex: 10, 
        backgroundColor: '#ffffffcc'
    },
    checkContainer: {
        position: 'absolute',
        top: Dimensions.get('window').height / 2 - 70,
        left: Dimensions.get('window').width / 2 - 50,
        right: 0,
        bottom: 0
    }
})

export default LoadingOverlay