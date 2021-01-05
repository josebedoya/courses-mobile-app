import { API } from '../api';

const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common['authorization'] = token;
  } else {
    delete API.defaults.headers.common['authorization'];
  }
};

export default setAuthToken;
