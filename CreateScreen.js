import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimeModal from './DateTimeModal';

function CreateScreen() {
    const [eventName, setEventName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [request, setRequest] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const [notes, setNotes] = useState("");

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
    
    const optionStyle = [styles.create_option, {opacity:(showDatePicker)?0.3:1}];
    return (
        <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20, backgroundColor:(showDatePicker)?'darkslategray':'white'}}>
            <View style={optionStyle}>
                <Text style={styles.label_text}>Sport:</Text>
                <TextInput onChangeText={t=> setEventName(t)} value={eventName} style={styles.text_input}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Capacity:</Text>
                <TextInput onChangeText={t => setCapacity(t)} value={capacity} style={[styles.text_input]}/>
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
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Notes:</Text>
                <TextInput multiline defaultValue='' style={styles.text_input}/>
            </View>

            <View style={optionStyle}>
                <Text style={styles.label_text}>Request?</Text>
                <View style={{width:"75%", opacity:(showDatePicker)?0.5:1}}>
                    <Button title={(request)?"Yes":"No"} onPress={()=>setRequest(!request)}/>
                </View>
            </View>

            <View style={{flexDirection:"row", paddingBottom:15, paddingTop: 20,justifyContent:'center', opacity:(showDatePicker)?0.15:1}}>
                <Button title="Save"/>
            </View>

            <View style={[{flexDirection:"row"}, {justifyContent:'center', opacity:(showDatePicker)?0.15:1}]}>
                <Button title="Cancel"/>
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
    },
    label_text: {
        flex: 1,
        fontSize:20
    },
    create_option: {
        flexDirection:"row", 
        marginBottom:20
    }
})

export default CreateScreen;