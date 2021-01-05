import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { fetchLanguages } from '../redux/slices/languagesSlice';

import LoginScreen from '../screens/login/LoginScreen';

import DashboardNavigator from './DashboardNavigator';
import CoursesNavigator from '../navigation/CoursesNavigator';
import checkAuth from '../utils/checkAuth';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      checkAuth();
      dispatch(fetchLanguages());
      console.log(isAuthenticated);
    }
    return () => mounted = false;
  }, [dispatch]);

  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Navigation;
