import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoursesMainScreen from '../screens/courses/CoursesMainScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import CourseForm from '../screens/courses/CourseForm';
import ChaptersScreen from '../screens/courses/ChaptersScreen';
import ChapterForm from '../screens/courses/ChapterForm';
import CoursesCategoriesScreen from '../screens/coursesCategories/CoursesCategoriesScreen';
import CourseCategoryForm from '../screens/coursesCategories/CourseCategoryForm';
import CourseTagsScreen from '../screens/coursesTags/CourseTagsScreen';
import CourseTagForm from '../screens/coursesTags/CourseTagForm';

const Stack = createStackNavigator();

const CoursesNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="CoursesMain"
        component={CoursesMainScreen}
      />
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

      <Stack.Screen
        name="Categories"
        component={CoursesCategoriesScreen}
      />
      <Stack.Screen
        name="AddCategory"
        component={CourseCategoryForm}
      />

      <Stack.Screen
        name="Tags"
        component={CourseTagsScreen}
      />
      <Stack.Screen
        name="AddTag"
        component={CourseTagForm}
      />
    </Stack.Navigator>
  )
}

export default CoursesNavigator;