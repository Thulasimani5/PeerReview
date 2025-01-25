import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TitleCardProps {
  title: string;
  date: string;
  time: string;
  button?: boolean; // Optional prop for showing the button
  ButtonText?: string; // Optional prop for dynamic button text
}

const TitleCard: React.FC<TitleCardProps> = ({ title, date, time, button = false, ButtonText = "Start Questions" }) => {
  // Determine the button background color based on the ButtonText
  const buttonStyle = ButtonText === "Completed" ? styles.completedButton : styles.defaultButton;
  
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{title}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
      {button && (
        <TouchableOpacity style={[styles.button, buttonStyle]}>
          <Text style={styles.buttonText}>{ButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  ); 
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Subtle gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    marginBottom:20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#7f8fa6', // Neutral gray
    fontWeight: '600',
    width: '20%', // Ensure labels don't take too much space
  },
  value: {
    fontSize: 16,
    color: '#353b48', // Darker neutral gray
    fontWeight: '400',
    width: '80%', // Ensure values take up the remaining space
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  defaultButton: {
    backgroundColor: '#007bff', // Blue background for the default button
  },
  completedButton: {
    backgroundColor: '#ff0000', // Red background for the "Completed" button
  },
  buttonText: {
    color: '#ffffff', // White text for the button
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
});

export default TitleCard;
