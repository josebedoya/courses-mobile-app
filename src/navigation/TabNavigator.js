import React from 'react';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardNavigator from './DashboardNavigator';
import CoursesNavigator from '../navigation/CoursesNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Dashboard') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'bar-chart'
                    : 'bar-chart-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Courses') {
            return (
              <Ionicons
                name={focused ? 'school' : 'school-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      {!isAuthenticated ? (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Logout',
            tabBarVisible: false,
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Dashboard"
            component={DashboardNavigator}
          />
          <Tab.Screen
            name="Courses"
            component={CoursesNavigator}
          />
        </>
      )}
    </Tab.Navigator>
  )
};

export default TabNavigator;
