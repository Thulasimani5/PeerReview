import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score, isEligible } = route.params;

  const resultStatus = isEligible ? 'Eligible' : 'Failed';

  // Pass the result status back to the StudentDashboard screen
  const handleGoBack = () => {
    navigation.navigate('StudentDashboard', { resultStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Text style={styles.score}>Your Score: {score}/40</Text>
      <Text style={styles.eligibility}>
        {isEligible
          ? 'Congratulations! You are eligible for the next level.'
          : 'You are not eligible for the next level. Try again!'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#16a085',
  },
  eligibility: {
    fontSize: 18,
    marginBottom: 30,
    color: '#34495e',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#74b9ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
