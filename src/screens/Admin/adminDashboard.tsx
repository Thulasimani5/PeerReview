import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import TitleCard from '../../components/TitleCard'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import AddIcon from '../../assets/icons/Add'; 

export default function AdminScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  
  const [assignments, setAssignments] = useState([]);

  
  useEffect(() => {
    if (route.params?.newAssignment) {
      setAssignments((prevAssignments) => [...prevAssignments, route.params.newAssignment]);
    }
  }, [route.params?.newAssignment]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>WELCOME RAMASAMY</Text>

        {assignments.map((assignment, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('DetailPage', { assignment })}
          >
            <TitleCard title={assignment.tittle} date={assignment.date} time={assignment.time} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAssignment')}
      >
        <AddIcon width={28} height={28} fill="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b4f87', 
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 80, 
    right: 20, 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#2b4f87', 
    justifyContent: 'center',
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
});
