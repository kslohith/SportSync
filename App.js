import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootSiblingParent } from 'react-native-root-siblings';
import CreateScreen from './CreateScreen';

export default function App() {
  return (
    <RootSiblingParent>
      <CreateScreen/>
    </RootSiblingParent>
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
