import { combineReducers } from "@reduxjs/toolkit";
import customerReducer from './customerHandle';
import userReducer from './userHandle';
import projectReducer from './projectHandle';

export default combineReducers({
    customers: customerReducer,
    users: userReducer,
    projects: projectReducer
});