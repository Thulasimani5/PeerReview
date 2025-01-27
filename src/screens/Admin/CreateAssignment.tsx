import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateAssignment() {
  const navigation = useNavigation();
  const [tittle, setTittle] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [stopTime, setStopTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showStopTimePicker, setShowStopTimePicker] = useState(false);

  const onDateChange = (event: any, selectedDate: React.SetStateAction<Date>) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onStartTimeChange = (event: any, selectedTime: React.SetStateAction<Date>) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onStopTimeChange = (event: any, selectedTime: React.SetStateAction<Date>) => {
    setShowStopTimePicker(false);
    if (selectedTime) {
      setStopTime(selectedTime);
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
    setShowStartTimePicker(false);
    setShowStopTimePicker(false);
  };

  const handleStartTimePress = () => {
    setShowStartTimePicker(true);
    setShowDatePicker(false);
    setShowStopTimePicker(false);
  };

  const handleStopTimePress = () => {
    setShowStopTimePicker(true);
    setShowDatePicker(false);
    setShowStartTimePicker(false);
  };

  const handleSubmit = () => {
    const assignmentData = {
      tittle,
      date: date.toDateString(),
      time: `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${stopTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };
    navigation.navigate('Admin', { newAssignment: assignmentData });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.screenTitle}>Create an Assignment</Text>

          <Text style={styles.label}>Tittle</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Tittle"
            value={tittle}
            onChangeText={setTittle}
          />

          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity onPress={handleDatePress} style={styles.pickerButton}>
            <Text style={styles.pickerText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity onPress={handleStartTimePress} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={onStartTimeChange}
            />
          )}

          <Text style={styles.label}>Stop Time</Text>
          <TouchableOpacity onPress={handleStopTimePress} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {stopTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
          {showStopTimePicker && (
            <DateTimePicker
              value={stopTime}
              mode="time"
              display="default"
              onChange={onStopTimeChange}
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b4f87',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 10, fontWeight: 'bold', color: '#2b4f87' },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  pickerText: { fontSize: 16 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2b4f87',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  goBackButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#cccccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  goBackButtonText: { color: '#2b4f87', fontWeight: 'bold', fontSize: 16 },
});
