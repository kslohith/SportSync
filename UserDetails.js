import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

function UserDetails({navigation}) {
    const [userDetails, setUserDetails] = useState([]);
    console.log("Render");
    useFocusEffect(
        useCallback(() => {
            const userName = "Himanshu";
            if (userName) {
                axios.get(`https://sportssync-backend.onrender.com/getEventByUser?name=${userName}`)
                .then((response) => {
                    setUserDetails(response.data.data); // Access the "data" field
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }, [])
    );

    const userDetailView = userDetails.map((user, index) => (
        <View style={styles.card} key={index}> 
            <Text>Event Name: {user.eventName || 'N/A'}</Text>
            <Text>Sport: {user.sport || 'N/A'}</Text>
            <Text>Date: {parseDate(user.date) || 'N/A'}</Text>
            <Text>Venue: {user.venue || 'N/A'}</Text>
            <Text>Organizer: {user.organizer || 'N/A'}</Text>
            <Text>Registered: {(user.capacity - user.slotsRemaining) + "/" + user.capacity}</Text>
            {/* <Text>Slots Remaining: {(fieldExists(user, "slotsRemaining")) ? user.slotsRemaining : 'N/A'}</Text> */}
            <Text>Invite Only?: {user.isPrivate ? 'Yes' : 'No'}</Text>
            <View style={{marginTop:4, flexDirection:"row", justifyContent:"flex-end"}}>
                <Button title="Manage" onPress={()=>navigation.navigate('ManageEvent', {eventId: user.eventId})}/>    
            </View>
        </View>
    ));
    return (
        <View style={{flex:1, flexDirection:'column', justifyContent: 'space-between'}}> 
            <ScrollView style={styles.container}> 
                {userDetails.length > 0 ? userDetailView : <Text>Loading...</Text>}
            </ScrollView>
            <Button title="Add event" onPress={()=>navigation.navigate('CreateEvent')}/>
        </View>
    );
}

function fieldExists(obj, field) {
    return obj.hasOwnProperty(field);
}

function parseDate(d) {
    const date = new Date(d);
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let mins = date.getMinutes();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    //if (hour < 10) hour = "0" + hour;
    if (mins < 10) mins = "0" + mins; 
    return month + "/" + day + ", " + hour + ":" + mins;
}

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'space-around',
        //alignItems: 'flex-start',
        flexDirection:'column',
        padding: 20,
        //maxWidth: 1200,
        //flexWrap: 'wrap'
    },
    card: {
        backgroundColor:'#ddd',
        borderWidth:1,
        borderRadius:8,
        margin:'5%',
        padding:20,
        textAlign:'left'
    }
})

export default UserDetails;
