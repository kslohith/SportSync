import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { sportsList } from './DropdownData';

export default function SportDropdown(props) {
    const [focused, setFocused] = useState(false);

    //console.log(props.skill);
    return (
        <Dropdown 
            style={{borderWidth: 1,width:'75%', paddingLeft:'2%'}}
            data={sportsList} 
            labelField="label"
            valueField="value"
            value={props.sport}
            onChange={(item)=>{
                props.setSport(item.value);
            }}
            
        />
    );
}