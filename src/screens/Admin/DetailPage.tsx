import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView, StyleSheet } from 'react-native';

export default function DetailPage({ route, navigation }) {
  const { assignment } = route.params;

  const [explanation, setExplanation] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [numberOfTasks, setNumberOfTasks] = useState('');
  const [taskTitles, setTaskTitles] = useState([]);
  const [taskTimes, setTaskTimes] = useState([]);
  const [inputHeight, setInputHeight] = useState(100);
  const [isStudentModalVisible, setStudentModalVisible] = useState(false);
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); 

  
  const renderNumberItem = ({ item, onSelect }) => (
    <TouchableOpacity
      style={styles.numberItem}
      onPress={() => {
        onSelect(item);
        setStudentModalVisible(false);
        setTaskModalVisible(false);
      }}
    >
      <Text style={styles.numberText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.numberItem}
      onPress={() => {
        const newTimes = [...taskTimes];
        newTimes[currentTaskIndex] = item;  
        setTaskTimes(newTimes);
        setTimeModalVisible(false);
      }}
    >
      <Text style={styles.numberText}>{item}</Text>
    </TouchableOpacity>
  );

  // Handle Task Title Input Change
  const handleTaskTitleChange = (text, index) => {
    const newTitles = [...taskTitles];
    newTitles[index] = text;
    setTaskTitles(newTitles);
  };

  
  const renderTaskDetails = () => {
    const tasks = [];
    for (let i = 0; i < numberOfTasks; i++) {
      tasks.push(
        <View key={i} style={styles.task}>
          <Text style={styles.tittle}>Task {i + 1} Details</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter Task ${i + 1} Title`}
            value={taskTitles[i]}
            onChangeText={(text) => handleTaskTitleChange(text, i)}
          />
          <TouchableOpacity
            style={styles.numberOfContainer}
            onPress={() => {
              setCurrentTaskIndex(i); 
              setTimeModalVisible(true);
            }}
          >
            <Text style={styles.numberOfLabel}>Task Time:</Text>
            <Text style={styles.numberOfValue}>{taskTimes[i] || 'Select a time'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return tasks;
  };

  
  const calculateTotalTime = () => {
    const timeInMinutes = {
      '5 min': 5,
      '10 min': 10,
      '15 min': 15,
      '20 min': 20,
      '25 min': 25,
      '30 min': 30,
      '35 min': 35,
      '40 min': 40,
      '45 min': 45,
      '50 min': 50,
    };

    let totalMinutes = 0;
    taskTimes.forEach((time) => {
      if (timeInMinutes[time]) {
        totalMinutes += timeInMinutes[time];
      }
    });
    return totalMinutes;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Assignment Detail</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Title: {assignment.tittle}</Text>
          <Text style={styles.detailText}>Date: {assignment.date}</Text>
          <Text style={styles.detailText}>Time: {assignment.time}</Text>
        </View>

        <TextInput
          style={[styles.input, { height: inputHeight }]}
          placeholder="Enter explanation for adding this question"
          value={explanation}
          onChangeText={setExplanation}
          multiline
          onContentSizeChange={(event) =>
            setInputHeight(Math.max(100, event.nativeEvent.contentSize.height))
          }
        />

        <TouchableOpacity
          style={styles.numberOfContainer}
          onPress={() => setStudentModalVisible(true)}
        >
          <Text style={styles.numberOfLabel}>Number of students:</Text>
          <Text style={styles.numberOfValue}>{numberOfStudents || 'Select a number'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberOfContainer}
          onPress={() => setTaskModalVisible(true)}
        >
          <Text style={styles.numberOfLabel}>Number of tasks:</Text>
          <Text style={styles.numberOfValue}>{numberOfTasks || 'Select a number'}</Text>
        </TouchableOpacity>

        {numberOfTasks > 0 && renderTaskDetails()}

        {numberOfTasks > 0 && (
          <View style={styles.totalTimeContainer}>
            <Text style={styles.totalTimeText}>Total Time: {calculateTotalTime()} minutes</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isStudentModalVisible}
        animationType="slide"
        onRequestClose={() => setStudentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Number (Students)</Text>
            <FlatList
              data={Array.from({ length: 50 }, (_, i) => i + 1)} 
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) =>
                renderNumberItem({
                  item,
                  onSelect: (value) => {
                    setNumberOfStudents(value);
                    setStudentModalVisible(false);
                  },
                })
              }
              contentContainerStyle={styles.modalList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStudentModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isTaskModalVisible}
        animationType="slide"
        onRequestClose={() => setTaskModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Number (Tasks)</Text>
            <FlatList
              data={Array.from({ length: 50 }, (_, i) => i + 1)} 
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) =>
                renderNumberItem({
                  item,
                  onSelect: (value) => {
                    setNumberOfTasks(value);
                    setTaskModalVisible(false);
                    setTaskTitles(new Array(value).fill('')); 
                    setTaskTimes(new Array(value).fill('')); 
                  },
                })
              }
              contentContainerStyle={styles.modalList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTaskModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isTimeModalVisible}
        animationType="slide"
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: '50%' }]}>
            <Text style={styles.modalTitle}>Select Task Time</Text>
            <FlatList
              data={['5 min', '10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min', '50 min']}
              keyExtractor={(item) => item}
              renderItem={renderTimeItem}
              contentContainerStyle={styles.modalList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTimeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Go Back Button */}
      <View style={styles.Button}>
        <View>
          <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  numberOfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  numberOfLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginRight: 10,
  },
  numberOfValue: {
    fontSize: 16,
    color: '#333',
  },
  goBackButton: {
    backgroundColor: '#2b4f87',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginBottom: 10,
  },
  modalList: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2b4f87',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  totalTimeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    alignItems: 'center',
  },
  totalTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b4f87',
  },
  task: {
    marginBottom: 20,
  },
  tittle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginBottom: 10,
  },
  numberItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  numberText: {
    fontSize: 16,
    color: '#333',
  },
});