import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Input } from '../components/input';
import { CheckIcon } from '../assets/icons';
import { Checkbox } from '../components/checkbox';

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Checkbox/>
    </View>
  )
}

const styles = StyleSheet.create({})