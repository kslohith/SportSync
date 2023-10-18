import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Platform} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-root-toast';

function checkNum(s, low, high) {
    return (/^(?=.*\d)[\d ]+$/.test(s) && parseInt(s) >= low && parseInt(s) <= high);
}

export default function DateTimeModal(props) {
    const [hr, setHr] = useState(props.date.getHours());
    const [mins, setMins] = useState(props.date.getMinutes());
    const [dd, setDD] = useState(props.date.getDate());
    const [mm, setMM] = useState(props.date.getMonth());

    const closeModal = () => {
        setHr(props.date.getHours());
        setMins(props.date.getMinutes());
        setDD(props.date.getDate());
        setMM(props.date.getMonth()); 
        props.setShowDatePicker(false);
    }
    const changeDate = () => {
        Keyboard.dismiss();
        let errorStr = null;
        if (!checkNum(hr, 0, 24)) {
            errorStr = "Invalid hours";
        } else if (!checkNum(mins, 0, 59)) {
            errorStr = "Invalid minutes";
        } if (!checkNum(mm, 1, 12)) {
            errorStr = "Invalid month"
        } else {
            let mon = parseInt(mm);
            if (mon == 2 && !checkNum(dd, 1, 28)) { //February
                errorStr = "Invalid date for month";
            } else if ([4,6,9,11].includes(mon) && !checkNum(dd, 1, 30)) { //30 day months
                errorStr = "Invalid date for month";
            } else if (!checkNum(dd, 1, 31)) { //31 day month
                errorStr = "Invalid date for month";
            }
        }

        if (errorStr != null) {
            console.log(errorStr);
            Toast.show(errorStr, {
                duration: Toast.durations.SHORT
            })

        } else {
            props.changeDate(hr, mins, dd, mm);
        }

    }

    const inputProps = {
        style:styles.text_input,
        maxLength:2,
        textAlign:'center'
    };
    
    return (
        <Modal isVisible={props.showDatePicker} backdropTransitionOutTiming={0} backdropOpacity={0}>
            <View style={styles.modal_style}>
                <View style={{flexDirection:"row", justifyContent:'space-between', marginBottom:10}}>
                    <View><Text style={styles.label_text}>Day </Text></View>
                    <View style={{flexDirection:"row"}}>
                        <TextInput {...inputProps} value={mm.toString()} onChangeText={(t)=>setMM(t)}/>
                        <Text style={[styles.label_text, {fontFamily: (Platform.OS === 'android')? 'monospace':'San Francisco'}]}>/</Text>
                        <TextInput {...inputProps} value={dd.toString()} onChangeText={(t)=>setDD(t)}/>
                    </View>
                </View>
                <View style={{flexDirection:"row", justifyContent:'space-between', marginBottom:15}}>
                    <View style={{marginRight:20}}><Text style={styles.label_text}>Time </Text></View>
                    <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                        <TextInput {...inputProps} value={hr.toString()} onChangeText={(t)=>setHr(t)}/>
                        <Text style={[styles.label_text, {fontFamily: (Platform.OS === 'android')? 'monospace':'San Francisco'}]}>:</Text>
                        <TextInput {...inputProps} value={mins.toString()} onChangeText={(t)=>setMins(t)}/>
                    </View>
                </View>
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                    <View style={{flex:1, marginRight:15}}><Button title="Save" onPress={changeDate}/></View>
                    <View style={{flex:1}}><Button title="Close" onPress={closeModal}/></View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal_style: {
        padding:30,
        alignSelf:"center", 
        backgroundColor: "white", 
        //alignItems:"center", 
        borderWidth:2, 
        borderRadius:20
    },
    text_input: {
        borderWidth:1,
        paddingLeft:2,
        paddingRight:2,
    },
    label_text: {
        fontSize:20,
        //borderWidth:1,
        fontVariant:['tabular-nums'],
    },
})