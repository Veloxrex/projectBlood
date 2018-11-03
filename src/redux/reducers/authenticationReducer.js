import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UPDATE_SUCCESS
} from '../actions/userActions';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        case UPDATE_SUCCESS:
            let currentUser = state.user;
            currentUser.firstName = action.user.firstName;
            currentUser.lastName = action.user.lastName;
            currentUser.email = action.user.email;
            localStorage.setItem("user",JSON.stringify(currentUser));
            return {
                ...state,
                user : currentUser
            };
        default:
            return state
    }
}