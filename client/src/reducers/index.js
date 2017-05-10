import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import allDocumentsReducer from './allDocumentsReducer';
import allRolesReducer from './allRolesReducer';
import allUsersReducer from './allUsersReducer';
import viewUserReducer from './viewUserReducer';
import verifyTokenReducer from './verifyTokenReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  allDocumentsReducer,
  allRolesReducer,
  allUsersReducer,
  viewUserReducer,
  verifyTokenReducer,
  loadingReducer
});

export default rootReducer;
