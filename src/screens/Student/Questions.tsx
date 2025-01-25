import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionsScreen = () => {
  const [timeRemaining, setTimeRemaining] = useState(40 * 60); // 40 minutes in seconds
  const [step, setStep] = useState(1); // Track the current step (1: Browsing, 2: Speaking)
  const [browsingTimeRemaining, setBrowsingTimeRemaining] = useState(1 * 60); // 15 minutes for browsing
  const [speakingTimeRemaining, setSpeakingTimeRemaining] = useState(2 * 0); // 25 minutes for speaking

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (step === 1 && browsingTimeRemaining > 0) {
      timer = setInterval(() => {
        setBrowsingTimeRemaining((prevTime) => prevTime - 1);
      }, 1000); // Countdown for browsing time
    } else if (step === 2 && speakingTimeRemaining > 0) {
      timer = setInterval(() => {
        setSpeakingTimeRemaining((prevTime) => prevTime - 1);
      }, 1000); // Countdown for speaking time
    }

    return () => {
      if (timer) {
        clearInterval(timer); // Cleanup the timer when component unmounts or changes
      }
    };
  }, [browsingTimeRemaining, speakingTimeRemaining, step]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStartSpeaking = () => {
    setStep(2); // Move to speaking step
    setBrowsingTimeRemaining(0); // Stop browsing timer
  };

  return (
    <View style={styles.container}>
      {/* Time Chart Section */}
      <Text style={styles.header}>Time Breakdown</Text>
      <View style={styles.timeChart}>
        <Text style={styles.timeText}>Time Limit: 40 mins</Text>
        <Text style={styles.timeText}>Browse Information: 15 mins</Text>
        <Text style={styles.timeText}>Speaking: 25 mins</Text>
      </View>

      {/* Timer Display */}
      {step === 1 && (
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {formatTime(browsingTimeRemaining)}
          </Text>
          <Text style={styles.instruction}>
            Browse the information. Time Remaining:
          </Text>
        </View>
      )}

      {step === 2 && (
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {formatTime(speakingTimeRemaining)}
          </Text>
          <Text style={styles.instruction}>Start Speaking Now!</Text>
        </View>
      )}

      {/* Button to Start Speaking */}
      {browsingTimeRemaining === 0 && step === 1 && (
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={handleStartSpeaking}>
            Start Speaking (25 minutes)
          </Text>
        </View>
      )}

      {/* Greeting Messages */}
      <View style={styles.greetingContainer}>
        {step === 1 ? (
          <Text style={styles.greeting}>Good luck! Time to browse the information.</Text>
        ) : step === 2 ? (
          <Text style={styles.greeting}>Now start speaking. All the best!</Text>
        ) : (
          <Text style={styles.completedGreeting}>Well done! You’ve completed the session. 🎉</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b4f87',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeChart: {
    marginBottom: 30,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    color: '#353b48',
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  instruction: {
    fontSize: 18,
    color: '#353b48',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  greetingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#2b4f87',
    textAlign: 'center',
  },
  completedGreeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
  },
});

export default QuestionsScreen;
