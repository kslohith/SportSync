import { StyleSheet, Text, View, Button} from 'react-native';


export default function RequestedBox(props) {
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
                Name: {props.requestedAttendee}
            </Text>
            <View style={{flexDirection: "row"}}>
                <Button title="Accept" onPress={() => props.onAccept(props.requestedAttendee)} />
                <Button title="Remove" onPress={() => props.onDeny(props.requestedAttendee)} />
            </View>
        </View>
    );
}