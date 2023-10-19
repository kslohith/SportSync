import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { skillLevels } from './DropdownData';
export function SearchDropdown(props) {
    const [focused, setFocused] = useState(false);

    //console.log(props.skill);
    return (
        <Dropdown 
            style={{borderWidth: 1,width:'75%', paddingLeft:'2%'}}
            data={skillLevels} 
            labelField="label"
            valueField="value"
            value={props.skill}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            onChange={(item)=>{
                setFocused(false);
                props.setSkill(item.value);
            }}

        />
    );
}