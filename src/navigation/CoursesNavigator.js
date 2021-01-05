import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import CoursesScreen from '../screens/courses/CoursesScreen';
import CourseForm from '../screens/courses/CourseForm';
import ChaptersScreen from '../screens/courses/ChaptersScreen';
import ChapterForm from '../screens/courses/ChapterForm';

const Stack = createStackNavigator();

const CoursesNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Courses"
        component={CoursesScreen}
      />
      <Stack.Screen
        name="AddCourse"
        component={CourseForm}
      />
      <Stack.Screen
        name="Chapter"
        component={ChaptersScreen}
      />
      <Stack.Screen
        name="AddChapter"
        component={ChapterForm}
      />
    </Stack.Navigator>
  )
}

export default CoursesNavigator;