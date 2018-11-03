import { combineReducers } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';

import alertReducer from './alertReducer';
import authenticationReducer from './authenticationReducer';
import registrationReducer from './registrationReducer';
import sidebarReducer from './sidebarReducer';
import themeReducer from './themeReducer';
import usersReducer from './usersReducer';
import landsReducer from './landsReducer';
import customizerReducer from './customizerReducer';
import socketReducer from './socketReducer';
import chatRoomsReducer from './chatRoomsReducer';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import rpsReduce from './rpsReduce';
import mapReducer from './mapReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
    form: reduxFormReducer,
    alert: alertReducer,
    authentication: authenticationReducer,
    registration: registrationReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    customizer: customizerReducer,
    users: usersReducer,
    lands: landsReducer,
    socket : socketReducer,
    chatRooms: chatRoomsReducer,
    isDisplayForm: isDisplayForm,
    itemEditing: itemEditing,
    rps: rpsReduce,
    map: mapReducer,
    game: gameReducer,
});

export default rootReducer;