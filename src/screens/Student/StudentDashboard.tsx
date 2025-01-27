import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import TitleCard from './TitleCard';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function StudentDashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const { resultStatus } = route.params || {};

  // Sample data for TitleCards
  const initialData = [
    {
      id: '1',
      title: 'Project Update Project Update',
      date: '2025-01-26',
      time: '2:00 PM',
      button: true,
      ButtonText: resultStatus === 'Failed' ? 'Failed' : 'Passed', // Update based on resultStatus
    },
    {
      id: '2',
      title: 'Project Update Project Update',
      date: '2025-01-26',
      time: '2:00 PM',
      button: true,
      ButtonText: resultStatus === 'Failed' ? 'Failed' : 'Start Questions', // Update based on resultStatus
    },
    {
      id: '3',
      title: 'Project Update Project Update',
      date: '2025-01-26',
      time: '2:00 PM',
      button: false,
      ButtonText: 'Start Questions', // This doesn't change, so no need for conditional check
    },
  ];

  // State to manage button text for each card
  const [cardsData, setCardsData] = useState(initialData);

  // Function to handle button press and update card's button text
  const handleButtonPress = (id: string) => {
    setCardsData(prevData =>
      prevData.map(card =>
        card.id === id
          ? { 
              ...card, 
              ButtonText: card.ButtonText === 'Start Questions' ? 'Passed' : 'Failed' 
            }
          : card
      )
    );
  };

  // Render each TitleCard using FlatList or map
  const renderItem = ({ item }) => (
    <TitleCard
      title={item.title}
      date={item.date}
      time={item.time}
      button={item.button}
      ButtonText={item.ButtonText}
    />
  );

  useEffect(() => {
    // Update button text based on resultStatus when the component mounts or resultStatus changes
    setCardsData(prevData =>
      prevData.map(card => ({
        ...card,
        ButtonText: resultStatus === 'Failed' ? 'Failed' : card.ButtonText,
      }))
    );
  }, [resultStatus]);

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <Text style={styles.title}>WELCOME ASWATH</Text>

        {/* Use FlatList to render TitleCards dynamically */}
        <FlatList
          data={cardsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b4f87',
  },
});
