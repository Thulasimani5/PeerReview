import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

const QuestionsScreen = ({navigation }) => {
  const [showScanner, setShowScanner] = useState(true); // Add scanner step
  const [showTimeBreakdown, setShowTimeBreakdown] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Browsing, Step 2: Speaking
  const [browsingTimeRemaining, setBrowsingTimeRemaining] = useState(1 * 6); // Browsing time: 15 mins
  const [speakingTimeRemaining, setSpeakingTimeRemaining] = useState(1 * 6); // Speaking time: 25 mins

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = [
    {
      step: 1,
      question:
        'How do you think technology has transformed the way we learn today? What are the benefits and challenges of incorporating technology into education? Do you believe it will continue to shape the future of learning?',
    },
    {
      step: 2,
      question:
        'Explain the information you found in detail. \n How do you think technology has transformed the way we learn today? What are the benefits and challenges of incorporating technology into education? Do you believe it will continue to shape the future of learning?',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    let timer = null;

    if (step === 1 && browsingTimeRemaining > 0) {
      timer = setInterval(() => {
        setBrowsingTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (step === 2 && speakingTimeRemaining > 0) {
      timer = setInterval(() => {
        setSpeakingTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    const question = questions.find(q => q.step === step);
    if (question) {
      setCurrentQuestion(question.question);
    }

    // Transition to speaking time when browsing time ends
    if (browsingTimeRemaining === 0 && step === 1) {
      setStep(2);
    }

    // Navigate to DataEntryScreen when speaking time is over
    if (speakingTimeRemaining === 0 && step === 2) {
      navigation.navigate('DataEntryScreen');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [browsingTimeRemaining, speakingTimeRemaining, step, navigation, questions]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <Text style={styles.scannerHeader}>Scan to Proceed</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Scanner Code"
          placeholderTextColor="#7f8c8d"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowScanner(false);
            setShowTimeBreakdown(true); // Proceed to time breakdown
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showTimeBreakdown) {
    return (
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownHeader}>Time Breakdown</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Time:</Text>
          <Text style={styles.infoValue}>40 mins</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Browsing Time:</Text>
          <Text style={styles.infoValue}>15 mins</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Speaking Time:</Text>
          <Text style={styles.infoValue}>25 mins</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTimeBreakdown(false)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task Timer</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {step === 1 ? 'Browsing Time Remaining' : 'Speaking Time Remaining'}
        </Text>
        <Text style={styles.timer}>
          {formatTime(
            step === 1 ? browsingTimeRemaining : speakingTimeRemaining,
          )}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Question</Text>
        <Text style={styles.cardContent}>{currentQuestion}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {step === 1
            ? 'Use your browsing time wisely to gather information.'
            : 'Explain your findings clearly and confidently.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  breakdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  breakdownHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 20,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  scannerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#34495e',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default QuestionsScreen;
