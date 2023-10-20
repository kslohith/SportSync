import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootSiblingParent } from 'react-native-root-siblings';
import CreateScreen from './CreateScreen';
import UserDetails from './UserDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageScreen from './ManageScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        {/* <CreateScreen/> */}
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={UserDetails}/>
          <Stack.Screen name="CreateEvent" component={CreateScreen} />
          <Stack.Screen name="ManageEvent" component={ManageScreen}/>
        </Stack.Navigator>
      </RootSiblingParent>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
