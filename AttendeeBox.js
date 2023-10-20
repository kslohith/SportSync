import { StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';

export default function AttendeeBox(props) {
    return (
        <View key={props.key}
        style={{
            height: 50,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'space-between',
            alignItems:"center",
            flexDirection: 'row',
            paddingLeft: 5,
            paddingRight: 5,
            marginBottom: 5
        }}>
            <Text style={{ color: 'black', textAlign: 'left' }}>
                Name: {props.attendee}
            </Text>
            {props.removable ? <Button title="Remove" onPress={() => props.onRemove(props.attendee)} /> :
            <Text style={{ color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Owner</Text>}
        </View>
    );
}