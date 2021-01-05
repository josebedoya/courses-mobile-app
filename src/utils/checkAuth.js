import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from "./setAuthToken";
import { setLoggedUser, logoutUser } from '../screens/login/loginSlice';
import store from '../redux/store';

const checkAuth = async () => {
  if (getLoginToken()) {
    const token = await getLoginToken();
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setLoggedUser(decoded));
    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      // window.location.href = '/';
    }
  }
}

const getLoginToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token_Key');
    if(value !== null) return value;
  } catch(error) {
    console.log('Error en token: ', error);
    return null;
  }
}

export default checkAuth;
