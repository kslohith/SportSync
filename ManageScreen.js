import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
//import Modal from 'react-native-modal';
//import DateTimeModal from './DateTimeModal';
import axios from 'axios';
import AttendeeBox from './AttendeeBox';
import RequestedBox from './RequestedBox';
import { useFocusEffect } from '@react-navigation/native';


//pPzyVfqi needs to be changed to generalize event id
function ManageScreen({route, navigation}) {
    const [eventData, setEventData] = useState(null);
    const {eventId} = route.params;
    console.log(eventId);
    // useEffect(() => {
    //     const eventId = 'pPzyVfqi'; //Replace with actual eventId
    //     axios
    //       .get(`https://sportssync-backend.onrender.com/event?eventId=${eventId}`)
    //       .then((response) => {
    //         // Extract the attendees array from the response data
    //         // Set the eventData to an array containing an object with the attendees
    //         setEventData(response.data.data);
    //         //console.log(response.data.data);
    //         console.log("Among us");
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching event data:', error);
    //       });
    //   }, []);
    useFocusEffect(
      useCallback(()=>{
        axios
          .get(`https://sportssync-backend.onrender.com/event?eventId=${eventId}`)
          .then((response) => {
            // Extract the attendees array from the response data
            // Set the eventData to an array containing an object with the attendees
            setEventData(response.data.data);
            //console.log(response.data.data);
            console.log("Among us");
          })
          .catch((error) => {
            console.log('Error fetching event data:', error);
          });
      }, [])
    );

 
    
    console.log("Event data: " + eventData);


    const handleRemove = async (attendeeName) => {
        try {
          const response = await axios.post('https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi', {
            attendees: {
              op: 'remove',
              list: [attendeeName],
            },
          });
          console.log(response.data); // Log the response from the server

          const updatedResponse = await axios.get(`https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi`);
          setEventData(updatedResponse.data.data);
        } catch (error) {
          console.error('Error removing attendee:', error);
        }
      };


      const handleAccept = async (requestedAttendee) => {
        try {
         const response1 = await axios.post('https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi', {
                attendees: {
                  op: 'add',
                  list: [requestedAttendee],
                },
              });
          console.log(response1.data);
          const response2 = await axios.post('https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi', {
            requestedAttendees: {
              op: 'remove',
              list: [requestedAttendee],
            },
          });
          console.log(response2.data); // Log the response from the server

          const updatedResponse = await axios.get(`https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi`);
          setEventData(updatedResponse.data.data);
        } catch (error) {
          console.error('Error accepting attendee:', error);
        }
      };

      const handleDeny = async (requestedAttendee) => {
        try {
          const response = await axios.post('https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi', {
            requestedAttendees: {
              op: 'remove',
              list: [requestedAttendee],
            },
          });
          console.log(response.data); // Log the response from the server

          const updatedResponse = await axios.get(`https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi`);
          setEventData(updatedResponse.data.data);
        } catch (error) {
          console.error('Error denying attendee:', error);
        }
      };

      const manualRefresh = async () => {
        try {
          const updatedResponse = await axios.get(`https://sportssync-backend.onrender.com/event?eventId=pPZyVfqi`);
          setEventData(updatedResponse.data.data);
        } catch (error) {
          console.error('Error during manual refresh:', error);
        }
      }

      
    const initialBoxes = (eventData != null) ? eventData.attendees.map((attendee, index) => (
        <View key={index}><AttendeeBox attendee={attendee} onRemove={handleRemove}
          removable={attendee !== eventData.organizer}
        /></View>
    )) : [];

    const reqBoxes = (eventData != null) ? eventData.requestedAttendees.map((requestedAttendee, index) => (
        <View key={index}><RequestedBox requestedAttendee={requestedAttendee} onAccept = {handleAccept} onDeny={handleDeny}

        /></View>
    )) : [];


    return (
        <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20,}}>
            <View style={{ flex: 1, paddingTop: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 30, textAlign: 'center' }}>Requests</Text>

                {(eventData!=null && eventData.isPrivate) ? 
                (<ScrollView style={{borderRadius: 10,flex:1, marginBottom:20, borderWidth:1, paddingLeft:5, paddingRight: 5, paddingTop:5}} > 
                  {reqBoxes.length === 0 ? (
                  <Text style={{ color: 'black', textAlign: 'center', fontStyle: 'italic' }}>No requests</Text>
                  ) : (reqBoxes)}
                </ScrollView>) : (<Text style={{ color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Requests are off</Text>)
                }
                <Text style={{ color: 'black', fontSize: 30, textAlign: 'center' }}>Attendees</Text>
                <ScrollView style={{borderRadius: 10,flex:1, marginBottom:20, borderWidth:1, paddingLeft:5, paddingRight: 5, paddingTop:5}}>
                  {initialBoxes}
                </ScrollView>
                <Button title="Refresh" onPress={() => manualRefresh()} />
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