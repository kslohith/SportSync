import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';

function CreateScreen() {
    const [eventName, setEventName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [request, setRequest] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={{paddingTop:40,}}>
            <View>
                <Text>Name:</Text>
                <TextInput onChangeText={setEventName} value={eventName} style={styles.text_input}/>
            </View>

            <View>
                <Text>Capacity:</Text>
                <TextInput onChangeText={setCapacity} value={capacity} style={styles.text_input}/>
            </View>

            <View>
                <Text>Time:</Text>
                <Button 
                    title={date.getHours().toString()+":"+((date.getMinutes() > 10)?"0":"")+date.getMinutes().toString()}
                    onPress={()=>setShowDatePicker(true)}/>
            </View>
            <Modal isVisible={showDatePicker}>
                <View style={{alignSelf:"center", backgroundColor: "white", alignItems:"center", borderWidth:2, borderRadius:20}}>
                    <Text>hello</Text>
                    <TextInput style={styles.text_input} defaultValue='hrs'/>
                    <TextInput style={styles.text_input} defaultValue='min'/>
                    <TextInput style={styles.text_input} defaultValue='dd'/>
                    <TextInput style={styles.text_input} defaultValue='mm'/>
                    <Button title="Close" onPress={()=>setShowDatePicker(false)}/>
                </View>
            </Modal>
            <View>
                <Text>Location:</Text>
                <TextInput onChangeText={setLocation} value={location} style={styles.text_input}/>
            </View>

            <View>
                <Text>Skill:</Text>
            </View>
            <View>
                <Text>Notes:</Text>
                <TextInput defaultValue=''/>
            </View>
            <View>
                <Text>Request?</Text>
                <Button title={(request)?"Yes":"No"} onPress={()=>setRequest(!request)}/>
            </View>
            <View>
                <Button title="Save"/>
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
    }
})

export default CreateScreen;