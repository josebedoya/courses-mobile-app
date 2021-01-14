import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

const LoadingOverlay = () => {
  return (
    <Spinner color='#fff' style={styles.spinner} />
  )
};

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  }
});

export default LoadingOverlay;
