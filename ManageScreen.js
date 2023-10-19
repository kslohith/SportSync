import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimeModal from './DateTimeModal';
import axios from 'axios';


function ManageScreen() {
    const [eventData, setEventData] = useState([]);

     
      useEffect(() => {
        const organizerName = 'lohith';
        // Fetch data for a specific user (replace 'lohith' with the actual username)
        axios
          .get(`https://sportssync-backend.onrender.com/getEventByUser?name=${organizerName}`)
          .then((response) => {
            setEventData(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching event data:', error);
          });
      }, []);


      const initialBoxes = eventData.map((entry) => ({
        id: entry.id, // Assuming there is an 'id' field in your eventData
        isVisible: true,
      }));
    
    const [boxes, setBoxes] = useState(initialBoxes);
/*
    const [eventName, setEventName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [request, setRequest] = useState(false); */
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
    const BoxComponent = ({ entry }) => (
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
          }}
        >
          <Text style={{ color: 'black', textAlign: 'left' }}>
            Event data: {entry.eventName}
          </Text>
          <Button title="Accept" onPress={() => hideBox(entry.id)} />
          <Button title="Deny" onPress={() => hideBox(entry.id)} style={greenButtonStyle} />
        </View>
      );

      const NextElement = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Next Element</Text>
        </View>
      );

          //<Text style={{ color: 'black' }}>Hello, I'm inside the box!</Text>
    //<Button title="Click Me" onPress={() => alert('Button clicked!')} />

    const optionStyle = [styles.create_option, {opacity:(showDatePicker)?0.3:1}];
    return (
    <View style={{flex:1, paddingTop:40, paddingLeft:20, paddingRight:20, backgroundColor:(showDatePicker)?'darkslategray':'white'}}>
    <View style={{ flex: 1, paddingTop: 40, paddingLeft: 20, paddingRight: 20, backgroundColor: 'white' }}>
    <Text style={{ color: 'black' }}>Hello, I'm inside the box!</Text>
    {eventData.map((entry) => (
        <BoxComponent key={entry.id} entry={entry} />
      ))}
      <NextElement />

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