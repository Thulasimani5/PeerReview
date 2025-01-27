import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminScreen from '../screens/Admin/adminDashboard';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentDashboard from '../screens/Student/StudentDashboard';
import Question from '../screens/Student/Questions';
import CreateAssignment from '../screens/Admin/CreateAssignment';
import DetailPage from '../screens/Admin/DetailPage';
import DataEntryScreen from '../screens/Student/Ranking';
import ResultScreen from '../screens/Student/Result';
export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Admin'>
      <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{headerShown: false}} 
        />
      <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name='CreateAssignment'
        component={CreateAssignment}
        options={{headerShown:false}}/>
        <Stack.Screen
        name='DetailPage'
        component={DetailPage}
        options={{headerShown:false}}/>



        <Stack.Screen
          name="Question"
          component={Question}
          options={{headerShown: false}} 
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
