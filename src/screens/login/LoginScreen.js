import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Toast } from 'native-base';

import { validateEmail } from '../../utils/validators';
import { loginRequest } from './loginSlice';
import LoadingOverlay from '../../components/LoadingOverlay';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const isValidEmail = validateEmail(email);
    if (!isValidEmail || !password) {
      Toast.show({
        text: 'All fields are required',
        buttonText: 'Okay',
        type: 'danger'
      });
      setIsLoading(false);
      return;
    };
    const response = await dispatch(loginRequest({ email, password }));
    if (loginRequest.fulfilled.match(response)) {
      Toast.show({
        text: `Welcome ${response.payload.firstName}`,
        buttonText: 'Okay',
        type: 'success',
        duration: 5000,
      });
      navigation.navigate('Dashboard');
    } else {
      Toast.show({
        text: 'Invalid credentials',
        buttonText: 'Okay',
        type: 'danger'
      });
    }
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
      <Content contentContainerStyle={styles.mainContent}>
        <Image source={require('../../../assets/10pearls.png')} style={{ width: 200, height: 200 }} />
        <Item regular style={styles.formItem}>
          <Input
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(newValue) => setEmail(newValue)}
          />
        </Item>
        <Item regular style={styles.formItem}>
          <Input
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            secureTextEntry
            onChangeText={(newValue) => setPassword(newValue)}
          />
        </Item>
        <Button block style={styles.button} onPress={() => handleSubmit()}>
          <Text>Sign In</Text>
        </Button>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
      </Content>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200
  },
  mainContent: {
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  formItem: {
    width: '80%',
    marginVertical: 5,
  },
  forgot_button: {
    height: 30,
    marginTop: 30,
    fontSize: 14
  },
  button: {
    alignSelf: "center",
    width: '80%',
    marginTop: 20
  },
});

export default LoginScreen;
