import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import TitleCard from '../components/TitleCard'; // Assuming TitleCard component is imported
import { Checkbox } from '../components/checkbox/Checkbox'; // Import Checkbox component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function HomeScreen() {
  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME RAMASAMY</Text>
      <TouchableOpacity  onPress={() => navigation.navigate('Attendance', { selectedJane })}>
           <TitleCard title="Project Update Project Update" date="2025-01-26" time="2:00 PM" />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Attendance', { selectedJane })}>
        <TitleCard title="Meeting Project Update Project" date="2025-01-25" time="10:00 AM" />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Attendance', { selectedJane })}>
           <TitleCard title="Project Update Project Update" date="2025-01-26" time="2:00 PM" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // White background
  },
  card: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Subtle gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b4f87', // Mild blue text
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#353b48',
  },
  rollNoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7f8fa6',
  },
});

