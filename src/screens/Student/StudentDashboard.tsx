import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TitleCard from './TitleCard';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

export default function StudentDashboard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{gap: 20}}>
        <Text style={styles.title}>WELCOME ASWATH</Text>
        <TitleCard
          title="Project Update Project Update"
          date="2025-01-26"
          time="2:00 PM"
          button
          ButtonText="Failed"
        />
        <TitleCard
          title="Project Update Project Update"
          date="2025-01-26"
          time="2:00 PM"
          button
        />
        <TitleCard
          title="Project Update Project Update"
          date="2025-01-26"
          time="2:00 PM"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // White background
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b4f87', // Mild blue text
  },
  bottomSection: {
    alignItems: 'center', // Center the content
    marginTop: 20, // Adds space from the main content
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8fa6',
    marginBottom: 10,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 10,
  },
  subText: {
    fontSize: 14,
    color: '#353b48',
    marginTop: 10,
    textAlign: 'center',
  },
});
