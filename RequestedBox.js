import { StyleSheet, Text, View, Button} from 'react-native';


export default function RequestedBox(props) {
    return (
        <View key={props.key}
        style={{
            width: 350,
            height: 50,
            marginVertical: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
        }}>
            <Text style={{ color: 'black', textAlign: 'left' }}>
                Name: {props.requestedAttendee}
            </Text>
            <Button title="Accept" onPress={() => props.onAccept(props.requestedAttendee)} />
            <Button title="Remove" onPress={() => props.onDeny(props.requestedAttendee)} />
        </View>
    );
}