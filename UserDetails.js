import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
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
            <Text>Date: {user.date || 'N/A'}</Text>
            <Text>Venue: {user.venue || 'N/A'}</Text>
            <Text>Organizer: {user.organizer || 'N/A'}</Text>
            <Text>Slots Remaining: {user.slotsRemaining || 'N/A'}</Text>
            <Text>Invite Only?: {user.isPrivate ? 'Yes' : 'No'}</Text>
        </View>
    ));
    return (
        <View style={{flex:1, flexDirection:'column', justifyContent: 'space-between'}}> 
            <View style={styles.container}> 
                {userDetails.length > 0 ? userDetailView : <Text>Loading...</Text>}
            </View>
            <Button title="Add event" onPress={()=>navigation.navigate('CreateEvent')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: 20,
        maxWidth: 1200,
        flexWrap: 'wrap'
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
