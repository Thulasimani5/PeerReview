import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';

const RankAssignmentScreen = ({ navigation }) => {
  const questions = [
    "Who is the most suitable for Task 1?",
    "Who is the most suitable for Task 2?",
    "Who is the most suitable for Task 3?",
    "Who is the most suitable for Task 4?",
    "Who is the most suitable for Task 5?",
  ];

  const studentNames = ["Student A", "Student B", "Student C", "Student D", "Student E"];

  const [rankAssignments, setRankAssignments] = useState(
    questions.map(() => Array(5).fill(''))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectedRankIndex, setSelectedRankIndex] = useState(null);

  useEffect(() => {
    if (timer === 0) {
      goToNextQuestion();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
    } else {
      handleSubmit();
    }
  };

  const handlePickerChange = (rankIndex, value) => {
    const updatedAssignments = [...rankAssignments];
    updatedAssignments[currentQuestionIndex][rankIndex] = value;
    setRankAssignments(updatedAssignments);
    setDropdownVisible(null);
  };

  const handleSubmit = () => {
    const score = Math.floor(Math.random() * 40); // Random score for demo
    const isEligible = score >= 20; // Eligibility criteria
    navigation.navigate('ResultScreen', { score, isEligible });
  };

  const renderDropdown = () => (
    <Modal
      visible={dropdownVisible !== null}
      transparent
      animationType="fade"
      onRequestClose={() => setDropdownVisible(null)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dropdownContainer}>
          <FlatList
            data={studentNames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handlePickerChange(selectedRankIndex, item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rank Assignment</Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time Remaining: {timer}s</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
        {Array(5)
          .fill(null)
          .map((_, rankIndex) => (
            <View key={rankIndex} style={styles.rankContainer}>
              <Text style={styles.rankLabel}>Rank {rankIndex + 1}:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setDropdownVisible(true);
                  setSelectedRankIndex(rankIndex);
                }}
              >
                <Text style={styles.dropdownText}>
                  {rankAssignments[currentQuestionIndex][rankIndex] || "Select a student"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {renderDropdown()}

      <TouchableOpacity style={styles.button} onPress={goToNextQuestion}>
        <Text style={styles.buttonText}>
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Submit Assignments"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d35400',
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: '#dfe6e9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rankLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#b2bec3',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#74b9ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    maxHeight: '50%',
  },
  dropdownItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default RankAssignmentScreen;
