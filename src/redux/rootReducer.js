import { combineReducers } from '@reduxjs/toolkit';

import courseCategoriesReducer from '../screens/coursesCategories/courseCategoriesSlice';
import coursesReduce from '../screens/courses/coursesSlice';
import courseTagsReducer from '../screens/coursesTags/courseTagsSlice';
import languagesReducer from '../redux/slices/languagesSlice';
import loginReducer from '../screens/login/loginSlice';

const rootReducer = combineReducers({
  auth: loginReducer,
  courseCategories: courseCategoriesReducer,
  courses: coursesReduce,
  courseTags: courseTagsReducer,
  languages: languagesReducer,
});

export default rootReducer;
