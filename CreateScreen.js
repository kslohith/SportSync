import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimeModal from './DateTimeModal';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import SearchDropdown from './SearchDropdown';

function CreateScreen() {
    const [eventName, setEventName] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [location, setLocation] = useState("");
    const [request, setRequest] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [skill, setSkill] = useState("Any");
    const [notes, setNotes] = useState("");
    const [disableSave, setDisableSave] = useState(false);
    
    const changeDate = (hr, mins, dd, mm) => {
        setDate((date) => {
            date.setHours(hr);
            date.setMinutes(mins);
            date.setDate(dd)
            date.setMonth(mm)
            return new Date(date);
        })
        setShowDatePicker(false);
    }
    const userId = "Himanshu";

    const createEvent = () => {
        if (!eventName.replace(/\s/g, '').length || !location.replace(/\s/g, '').length || capacity <= 0) {
            console.log("Invalid input somewhere");
            return; 
        }
        setDisableSave(true);
        axios({
            method: 'post',
            url:'https://sportssync-backend.onrender.com/createEvent',
            headers:{},
            data:{
                'eventName': eventName,
                'organizer': userId,
                'venue': location,
                'date': date,
                'slotsRemaining': (capacity-1),
                'isPrivate': request,
                'capacity': capacity,
                'attendees': [userId],
                'dateOfCreation': new Date(),
                'eventSkill': skill,
                'requestedAttendees':[]
            }
        }).then((response) => {
            console.log(response);
            setEventName("");
            setCapacity(1);
            setLocation("");
            setRequest(false);
            setDate(new Date());
            setNotes("");
            setSkill("Any");
            setDisableSave(false);
        }).catch((err) => {
            console.log(err);
            setDisableSave(false);
        });
    }


    const optionStyle = [styles.create_option, {opacity:(showDatePicker)?0.3:1}];
    return (
        <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20, backgroundColor:(showDatePicker)?'darkslategray':'white'}}>
            <View style={optionStyle}>
                <Text style={styles.label_text}>Sport:</Text>
                <TextInput onChangeText={t=> setEventName(t)} value={eventName} style={styles.text_input}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Capacity:</Text>
                <TextInput 
                    onChangeText={t => {
                        if (/^(?=.*\d)[\d ]+$/.test(t)) {
                            setCapacity(parseInt(t));
                        }
                    }} 
                    value={capacity.toString()} style={[styles.text_input]}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Time:</Text>
                <View style={{width:'75%', opacity:(showDatePicker)?0.5:1}}>
                    <Button
                        title={date.getHours().toString()+":"+((date.getMinutes() < 10)?"0":"")+date.getMinutes().toString()}
                        onPress={()=>setShowDatePicker(true)}/>
                </View>
            </View>

            <DateTimeModal showDatePicker={showDatePicker} changeDate={changeDate} setShowDatePicker={setShowDatePicker} date={date}/>
            {/* {dateModal} */}

            <View style={optionStyle}>
                <Text style={styles.label_text}>Location:</Text>
                <TextInput onChangeText={t=>setLocation(t)} value={location} style={styles.text_input}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Skill:</Text>
                <SearchDropdown skill={skill} setSkill={setSkill}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Notes:</Text>
                <TextInput multiline defaultValue={"man why does not work please help m"} onChangeText={t=>setNotes(t)} style={styles.text_input}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Request?</Text>
                <View style={{flexDirection:"row", width:"75%", opacity:(showDatePicker)?0.5:1}}>
                    <Button title={(request)?"Yes":"No"} onPress={()=>setRequest(!request)}/>
                </View>
            </View>

            <View style={{flexDirection:"row", paddingBottom:15, paddingTop: 20,justifyContent:'center', opacity:(showDatePicker)?0.15:1}}>
                <Button disabled={disableSave} title="Save"
                    onPress={createEvent}/>
            </View>

            <View style={[{flexDirection:"row"}, {justifyContent:'center', opacity:(showDatePicker)?0.15:1}]}>
                <Button disabled={disableSave} title="Cancel"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text_input: {
        borderWidth:1,
        paddingLeft:10,
        paddingRight:10,
        width:'75%',
        fontFamily: (Platform.OS === 'android')? 'monospace':'San Francisco'
    },
    label_text: {
        flex: 1,
        fontSize:20,
        //borderWidth:1,
    },
    create_option: {
        flexDirection:"row", 
        marginBottom:20
    }
})

export default CreateScreen;