import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentDashboard from '../screens/Student/StudentDashboard';
import Question from '../screens/Student/Questions';
import DataEntryScreen from '../screens/Student/Ranking';
import ResultScreen from '../screens/Student/Result';
export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{headerShown: false}} // This hides the default title/header
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}} // This hides the default title/header
        />
        <Stack.Screen
          name="Question"
          component={Question}
          options={{headerShown: false}} // This hides the default title/header
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{headerShown: false}} // This hides the default title/header
        />
        <Stack.Screen name="DataEntryScreen" component={DataEntryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
