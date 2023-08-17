import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faPlus, faPen, faTrash, faXmark, faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Searchbar } from 'react-native-paper';

const AddChargeScreen = (props) => {
    const [chargeSearch, setChargeSearch] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);
    var charges = [
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
        {chargeNumber: '192.155.42.18', chargeCountry: 'United States'},
        {chargeNumber: '163.18.229.135', chargeCountry: 'South Africa'},
        {chargeNumber: '194.124.77.182', chargeCountry: 'Thailand'},
        {chargeNumber: '195.125.63.58', chargeCountry: 'United Kingdom'},
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
        {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},        
    ];
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const handleSearch = (chargeSearch) => {
        setChargeSearch(chargeSearch);
        const searchFilter = charges.filter((charge) => charge.chargeNumber.includes(chargeSearch) || charge.chargeCountry.includes(chargeSearch))
        setSearchedArray(searchFilter);
    }
    const handleClear = () => {
        setChargeSearch('');
        setSearchedArray([]);
    }
    return (
        <View style={styles.addChargeContainer}>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                <View style={styles.addChargeBtnGroup}>
                    <TouchableOpacity><View style={[styles.btnItem, {marginRight: 15}]}><FontAwesomeIcon icon={faPlus} size={15} color={'#000000'} /></View></TouchableOpacity>
                    <TouchableOpacity><View style={[styles.btnItem, {marginRight: 15}]}><FontAwesomeIcon icon={faPen} size={15} color={'#000000'} /></View></TouchableOpacity>
                    <TouchableOpacity><View style={styles.btnItem}><FontAwesomeIcon icon={faTrash} size={15} color={'#000000'} /></View></TouchableOpacity>
                </View>
            </View>
            <View style={[styles.goBack, {marginTop: 20}]}><Text style={styles.chargePlacesText}>Charge places</Text></View>
            <View style={styles.chargeSearch}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={chargeSearch => handleSearch(chargeSearch)}
                    value={chargeSearch}
                    icon={() => <FontAwesomeIcon icon={faSearch} size={15} color={'#BDBDBD'} />}
                    clearIcon={() => <FontAwesomeIcon icon={faCircleXmark} size={15} color={'#BDBDBD'} />}
                    onClearIconPress={() => handleClear()}
                    style={styles.searchContainer}
                />
            </View>
            <View style={styles.chargeList}>
                {
                    searchedArray.length === 0 ? charges.map(((charge, index) => {
                        return (
                            <View key={index} style={styles.chargeListItem}>
                                <View style={styles.chargeItemStyle}>
                                    <Text style={[styles.chargeItemText, {marginRight: 40}]}>{index + 1}.</Text>
                                    <Text style={styles.chargeItemText}>{charge.chargeNumber}</Text>
                                    <Text style={[styles.chargeItemText, {marginHorizontal: 10}]}>/</Text>
                                    <Text style={styles.chargeItemText}>{charge.chargeCountry}</Text>
                                </View>
                                <View style={styles.divider}></View>
                            </View>
                        )
                    }))
                    :
                    searchedArray.map(((charge, index) => {
                        return (
                            <View key={index} style={styles.chargeListItem}>
                                <View style={styles.chargeItemStyle}>
                                    <Text style={[styles.chargeItemText, {marginRight: 40}]}>{index + 1}.</Text>
                                    <Text style={styles.chargeItemText}>{charge.chargeNumber}</Text>
                                    <Text style={[styles.chargeItemText, {marginHorizontal: 10}]}>/</Text>
                                    <Text style={styles.chargeItemText}>{charge.chargeCountry}</Text>
                                </View>
                                <View style={styles.divider}></View>
                            </View>
                        )
                    }))
                }
            </View>
        </View>
    );
}

export default AddChargeScreen;

const styles = StyleSheet.create({
    addChargeContainer: {
        width: '100%',
        marginVertical: 50,
    },
    goBack: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addChargeBtnGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 30,
    },
    btnItem: {
        width: 31,
        height: 31,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chargePlacesText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000000'
    },
    chargeSearch: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginVertical: 20,
    },
    searchContainer: {
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 30,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chargeList: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    chargeListItem: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30
    },
    chargeItemStyle: {
        width: Dimensions.get('window').width - 60,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    chargeItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000'
    },
    divider: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: '#DCDFE7',
        marginVertical: 5,
        alignSelf: 'center'
    },
})