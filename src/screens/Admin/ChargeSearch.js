import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faPlus, faPen, faTrash, faXmark, faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Searchbar } from 'react-native-paper';
import I18n from './../../../i18n/i18n';

const ChargeSearch = (props) => {
    const [chargeSearch, setChargeSearch] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);
    const charges = useSelector((state) => state.charge["charges"]);
    // var charges = [
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
    //     {chargeNumber: '192.155.42.18', chargeCountry: 'United States'},
    //     {chargeNumber: '163.18.229.135', chargeCountry: 'South Africa'},
    //     {chargeNumber: '194.124.77.182', chargeCountry: 'Thailand'},
    //     {chargeNumber: '195.125.63.58', chargeCountry: 'United Kingdom'},
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},
    //     {chargeNumber: '192.173.62.115', chargeCountry: 'New Zealand'},        
    // ];
    const handleGoBak = () => {
        props.navigation.goBack();
    }
    const handleSearch = (chargeSearch) => {
        setChargeSearch(chargeSearch);
        const searchFilter = charges.filter((charge) => charge["ip"].includes(chargeSearch) || charge["country"].includes(chargeSearch))
        if (searchFilter.length == 0) {
            setSearchedArray(null);
        } else {
            setSearchedArray(searchFilter)
        }
    }
    const handleClear = () => {
        setChargeSearch('');
        setSearchedArray([]);
    }
    const handleAddCharge = () => {
        props.navigation.navigate("AddCharge", { chargeName: "", chargeIp: "", chargeLatLon: "", batteryUsers: [], edit: false });
    }
    const handleChargeEdit = (charge) => {
        props.navigation.navigate("AddCharge", { chargeId: charge["id"], chargeName: charge["name"], chargeIp: charge["ip"], chargeLatLon: charge["latlon"], batteryUsers: charge["batteryUsers"], edit: true });
    }

    useEffect(() => {
        if(props.route.params) {
            const addCharge = props.route.params.addCharge;
            if(addCharge == true) {
                console.log("Added New Charge !");
            }
            
            if(props.route.params.update == "success") {
                alert(I18n.t('chargeUpdate'));
            }
            if(props.route.params.addCharge == true) {
                alert(I18n.t('chargeAdd'));
            }
        }
    }, [props.route.params]);
    return (
        <ScrollView>
            <View style={styles.addChargeContainer}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => handleGoBak()}><FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#000000" }} /></TouchableOpacity>
                    <View style={styles.addChargeBtnGroup}>
                        <TouchableOpacity onPress={() => handleAddCharge()}><View style={[styles.btnItem, {marginRight: 15}]}><FontAwesomeIcon icon={faPlus} size={15} color={'#000000'} /></View></TouchableOpacity>
                        <TouchableOpacity><View style={[styles.btnItem, {marginRight: 15}]}><FontAwesomeIcon icon={faPen} size={15} color={'#000000'} /></View></TouchableOpacity>
                        <TouchableOpacity><View style={styles.btnItem}><FontAwesomeIcon icon={faTrash} size={15} color={'#000000'} /></View></TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.goBack, {marginTop: 20}]}><Text style={styles.chargePlacesText}>{I18n.t('chargePlaces')}</Text></View>
                <View style={styles.chargeSearch}>
                    <Searchbar
                        placeholder={I18n.t('search')}
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
                        chargeSearch === "" ? charges.map(((charge, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleChargeEdit(charge)} style={styles.chargeListItem}>
                                    <View>
                                        <View style={styles.chargeItemStyle}>
                                            <Text style={[styles.chargeItemText, {marginRight: 40}]}>{index + 1}.</Text>
                                            <Text style={styles.chargeItemText}>{charge["ip"]}</Text>
                                            <Text style={[styles.chargeItemText, {marginHorizontal: 10}]}>/</Text>
                                            <Text style={styles.chargeItemText}>{charge["country"]}</Text>
                                        </View>
                                        <View style={styles.divider}></View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }))
                        :
                        (searchedArray === null && chargeSearch !== "") ?
                        <View></View>
                        :
                        searchedArray.map(((charge, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleChargeEdit(charge)} style={styles.chargeListItem}>
                                    <View>
                                        <View style={styles.chargeItemStyle}>
                                            <Text style={[styles.chargeItemText, {marginRight: 40}]}>{index + 1}.</Text>
                                            <Text style={styles.chargeItemText}>{charge["ip"]}</Text>
                                            <Text style={[styles.chargeItemText, {marginHorizontal: 10}]}>/</Text>
                                            <Text style={styles.chargeItemText}>{charge["country"]}</Text>
                                        </View>
                                        <View style={styles.divider}></View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }))
                    }
                </View>
            </View>
        </ScrollView>
    );
}

export default ChargeSearch;

const styles = StyleSheet.create({
    addChargeContainer: {
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