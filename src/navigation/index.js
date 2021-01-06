import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { fetchLanguages } from '../redux/slices/languagesSlice';

import checkAuth from '../utils/checkAuth';
import TabNavigator from './TabNavigator';

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      checkAuth();
      dispatch(fetchLanguages());
    }
    return () => mounted = false;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
