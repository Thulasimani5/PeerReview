import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TitleCardProps {
  title: string;
  date: string;
  time: string;
  button?: boolean;
  ButtonText?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({
  title,
  date,
  time,
  button = false,
  ButtonText = "Start Questions",
}) => {
  const navigation = useNavigation();

  const isCompleted = ButtonText === "Failed";

  const handleButtonPress = () => {
    if (!isCompleted) {
      navigation.navigate('Question');
    }
  };

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
        <TouchableOpacity
          style={[styles.button, isCompleted ? styles.completedButton : styles.defaultButton]}
          onPress={handleButtonPress}
          activeOpacity={isCompleted ? 1 : 0.7}
          accessibilityLabel={isCompleted ? 'Completed button' : 'Start Questions button'}
          accessible
        >
          <Text style={styles.buttonText}>{ButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16, // Added margin for spacing between cards
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#7f8fa6',
    fontWeight: '600',
    width: '30%',
  },
  value: {
    fontSize: 16,
    color: '#353b48',
    fontWeight: '400',
    width: '70%',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  defaultButton: {
    backgroundColor: '#007bff',
  },
  completedButton: {
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
});

export default TitleCard;
