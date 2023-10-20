import { StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';

export default function AttendeeBox(props) {
    return (
        <View key={props.key}
        style={{
            width: 370,
            height: 100,
            marginVertical: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
        }}>
            <Text style={{ color: 'black', textAlign: 'left' }}>
                Name: {props.attendee}
            </Text>
            <Button title="Accept" onPress={() => console.log("Accept")} />
            <Button title="Remove" onPress={() => props.onRemove(props.attendee)} />
        </View>
    );
}