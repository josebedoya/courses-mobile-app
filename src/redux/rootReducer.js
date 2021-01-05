import { combineReducers } from '@reduxjs/toolkit';

import coursesReduce from '../screens/courses/coursesSlice';
import languagesReducer from '../redux/slices/languagesSlice';
import loginReducer from '../screens/login/loginSlice';

const rootReducer = combineReducers({
  auth: loginReducer,
  languages: languagesReducer,
  courses: coursesReduce
});

export default rootReducer;
