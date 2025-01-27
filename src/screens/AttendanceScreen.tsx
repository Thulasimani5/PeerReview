import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { Checkbox } from '../components/checkbox/Checkbox'; // Import Checkbox component
import { RouteProp, useNavigation } from '@react-navigation/native';
import ArrowBack from '../assets/icons/ArrowBack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define a type for the route params
type AttendanceScreenRouteProps = RouteProp<{ AttendanceScreen: { initialData?: AttendanceData[] } }, 'AttendanceScreen'>;

interface AttendanceData {
  id: number;
  name: string;
  rollNo: string;
  selected: boolean;
}

interface AttendanceScreenProps {
  route: AttendanceScreenRouteProps;
}

// Initial data for the attendance cards
const initialData: AttendanceData[] = [
  { id: 1, name: 'Jane Smith', rollNo: '67890', selected: false },
  { id: 2, name: 'John Doe', rollNo: '12345', selected: false },
  { id: 3, name: 'Emily Davis', rollNo: '45678', selected: true },
  { id: 4, name: 'Michael Brown', rollNo: '98765', selected: false },
];

export default function AttendanceScreen({ route }: AttendanceScreenProps) {
  const { initialData: passedData } = route.params || {}; // Check if data is passed, fallback to default data
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>(passedData || initialData); // State for multiple cards
  const navigation = useNavigation(); // Hook for navigation

  const handleCheckboxPress = (id: number, newState: boolean) => {
    // Update the selected state for the specific card
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: newState } : item
      )
    );
  };

  const handleStartPress = () => {
    // Handle the Start button press action
    console.log('Attendance started with selected students:', attendanceData.filter(item => item.selected));
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      {/* Back Arrow */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowBack color="#2b4f87" />
        </Pressable>
        <Text style={styles.title}>Attendance Screen</Text>
      </View>

      {/* List of Cards */}
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Checkbox
              selected={item.selected}
              onPress={(newState) => handleCheckboxPress(item.id, newState)}
              label={<View style={styles.labelContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.rollNoText}>Roll No: {item.rollNo}</Text>
              </View>} name={''} rollNo={''}            />
          </View>
        )}
      />

      {/* Start Button */}
      <Pressable style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Start</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // White background
  },
  backButton: {
    marginBottom: 10, // Space below the back arrow
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
    top: 4,
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
  startButton: {
    backgroundColor: '#2b4f87', // Mild blue background
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text
  },
});
