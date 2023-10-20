import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimeModal from './DateTimeModal';
import axios from 'axios';
import AttendeeBox from './AttendeeBox';


function ManageScreen() {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        axios
          .get(`https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi`)
          .then((response) => {
            // Extract the attendees array from the response data
            // Set the eventData to an array containing an object with the attendees
            setEventData(response.data.data);
            //console.log(response.data.data);

          })
          .catch((error) => {
            console.error('Error fetching event data:', error);
          });
      }, []);
    
    console.log(eventData);

    const initialBoxes = (eventData != null) ? eventData.attendees.map((attendee, index) => (
        <View key={index}><AttendeeBox attendee={attendee}/></View>
    )) : [];


    //   const NextElement = () => (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //       <Text style={{ color: 'black' }}>Next Element</Text>
    //     </View>
    //   );
    return (
        <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20,}}>
            <View style={{ flex: 1, paddingTop: 40, paddingLeft: 20, paddingRight: 20, backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 30 }}>Pending Requests</Text>
                {initialBoxes}
                <Button title="Click Me" onPress={() => alert('Button clicked!')} />
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


export default ManageScreen;