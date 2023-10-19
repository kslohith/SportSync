import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimeModal from './DateTimeModal';
import axios from 'axios';


function ManageScreen() {

    const initialBoxes = [
        { id: 1, isVisible: true },
        { id: 2, isVisible: true },
        // Add more boxes as needed
      ];

    const [boxes, setBoxes] = useState(initialBoxes);

    const [eventName, setEventName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [request, setRequest] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [notes, setNotes] = useState("");

    const baseUrl = "https://sportssync-backend.onrender.com/"

    const [boxColor, setBoxColor] = useState('white');

    const [showBox, setShowBox] = useState(true);


    const greenButtonStyle = {
        backgroundColor: 'green',
      };

      const redButtonStyle = {
        backgroundColor: 'red',
      };
    


    const hideBox = (boxId) => {
        setBoxes((prevBoxes) =>
          prevBoxes.map((box) =>
            box.id === boxId ? { ...box, isVisible: false } : box
          )
        );
      };
  
    
    // Test variables
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


      const BoxComponent = ({ box }) => (
        <View
          style={{
            width: 370,
            height: 100,
            backgroundColor: boxColor,
            marginVertical: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            display: box.isVisible ? 'flex' : 'none',

          }}
        >
        <Text style={{ color: 'black', textAlign: 'left' }}>
        Hello, I'm inside the box {box.id}!
      </Text>
        <Button title="Accept" onPress={() => hideBox(box.id)} />
        <Button title="Deny" onPress={() => hideBox(box.id)} style={greenButtonStyle}
    />
      </View>
      );
    //<Text style={{ color: 'black' }}>Hello, I'm inside the box!</Text>
    //<Button title="Click Me" onPress={() => alert('Button clicked!')} />
    const NextElement = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Next Element</Text>
        </View>
      );

    const optionStyle = [styles.create_option, {opacity:(showDatePicker)?0.3:1}];
    return (
        <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20, backgroundColor:(showDatePicker)?'darkslategray':'white'}}>
    <View style={{ flex: 1, paddingTop: 40, paddingLeft: 20, paddingRight: 20, backgroundColor: 'white' }}>
      {boxes.map((box) => (
        <BoxComponent key={box.id} box={box} />
      ))}
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