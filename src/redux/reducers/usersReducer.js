import {
    GETALL_REQUEST,
    GETALL_SUCCESS,
    GETALL_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    SET_SOCIAL_USER,
    UPDATE_REQUEST,
    UPDATE_FAILURE,
    UPDATE_SUCCESS,
    UPDATE_IMAGE_USER
} from '../actions/userActions';

export default function (state = {}, action) {
    switch (action.type) {
        case GETALL_REQUEST:
            return {
                loading: true
            };
        case GETALL_SUCCESS:
            return {
                users: action.users
            };
        case GETALL_FAILURE:
            return {
                error: action.error
            };
        case DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? {...user, deleting: true}
                        : user
                )
            };
        case DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const {deleting, ...userCopy} = user;
                        // return copy of user with 'deleteError:[error]' property
                        return {...userCopy, deleteError: action.error};
                    }

                    return user;
                })
            };
        case SET_SOCIAL_USER:
            return {
                ...state,
                socialUser: action.socialUser,
                userImgUrl: action.userImgUrl
            };
        case UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_IMAGE_USER:
            return {
                ...state,
                imageUser: action.imageUser
            };
        default:
            return state
    }
}
