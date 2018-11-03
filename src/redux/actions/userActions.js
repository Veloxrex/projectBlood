import { userService } from '../services/userService';
import alertActions from './alertActions';
import { socketActions } from './socketActions';
import { history } from '../services/history';

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

export const LOGOUT = 'USERS_LOGOUT';

export const GETALL_REQUEST = 'USERS_GETALL_REQUEST';
export const GETALL_SUCCESS = 'USERS_GETALL_SUCCESS';
export const GETALL_FAILURE = 'USERS_GETALL_FAILURE';

export const DELETE_REQUEST = 'USERS_DELETE_REQUEST';
export const DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const DELETE_FAILURE = 'USERS_DELETE_FAILURE';

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';


export const SET_SOCIAL_USER = 'SET_SOCIAL_USER';

export const UPDATE_IMAGE_USER = 'UPDATE_IMAGE_USER';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    update,
    delete: _delete,
    socialLoginRequest,
    socialUserSubmit
};

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));
        userService.login(userName, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(socketActions.userConnected(userName));
                    history.push('/google_map');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: LOGIN_REQUEST, user } }
    function success(user) { return { type: LOGIN_SUCCESS, user } }
    function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: REGISTER_REQUEST, user } }
    function success(user) { return { type: REGISTER_SUCCESS, user } }
    function failure(error) { return { type: REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: GETALL_REQUEST } }
    function success(users) { return { type: GETALL_SUCCESS, users } }
    function failure(error) { return { type: GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: DELETE_REQUEST, id } }
    function success(id) { return { type: DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: DELETE_FAILURE, id, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request());
        userService.update(user)
            .then(
                () => {
                    dispatch(success(user));
                    dispatch(alertActions.success("Update info success"));
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error.toString()));

                }
            );

    }
    function request() { return { type: UPDATE_REQUEST } }
    function success(user) { return { type: UPDATE_SUCCESS,user } }
    function failure() { return { type: UPDATE_FAILURE } }
}

//handle when User login from Social App want to register
function socialUserSubmit(user) {
    return dispatch => {
        userService.register(user) // if register success from social User
            .then(() => {
                // LOGIN AFTER REGISTER
                userService.login(user.userName, user.password)
                    .then(
                        user => {
                            dispatch(success(user));
                            history.push('/google_map');
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    );

                function success(user) { return { type: LOGIN_SUCCESS, user } }
                function failure(error) { return { type: LOGIN_FAILURE, error } }
                // END LOGIN AFTER REGISTER

            })
            .catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });


        function failure(error) { return { type: LOGIN_FAILURE, error } }
    }
}
// end Handle Social User

// Send login request from Social App User , Login if that user exist, Display submit form if user no exist
function socialLoginRequest(socialUser, type) {
    let user = {};
    let userImgUrl;
    switch (type) {
        case `google`:
            user.userName = socialUser.profileObj.email;
            user.password = socialUser.googleId;
            user.firstName = socialUser.profileObj.familyName;
            user.lastName = socialUser.profileObj.givenName;
            userImgUrl = socialUser.profileObj.imageUrl;
            break;
        case `facebook`:
            user.userName = socialUser.email;
            user.password = socialUser.id;
            user.firstName = socialUser.name;
            user.lastName = socialUser.name;
            userImgUrl = socialUser.picture.data.url;
            break;
        default:
            break;
    }
    return dispatch => {
        userService.socialLoginRequest(user).then(data => {
            const { result } = data;
            if (result) {
                userService.login(user.userName, user.password)
                    .then(
                        user => {
                            dispatch(success(user));
                            history.push('/google_map');
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    );
            }
            else {
                //if social user no exist
                // register(user);
                dispatch({ type: SET_SOCIAL_USER, socialUser: user, userImgUrl: userImgUrl });
                history.push('/verify');
                // userService.register(user)
                //     .then(
                //         user => {
                //             dispatch(success());
                //             history.push('/login');
                //             dispatch(alertActions.success('Registration successful'));
                //         },
                //         error => {
                //             dispatch(failure(error.toString()));
                //             dispatch(alertActions.error(error.toString()));
                //         }
                //     );

                //     function success(user) { return { type: REGISTER_SUCCESS, user } }
                //     function failure(error) { return { type: REGISTER_FAILURE, error } }
                //     //
            }
        });
        function success(user) { return { type: LOGIN_SUCCESS, user } }
        function failure(error) { return { type: LOGIN_FAILURE, error } }
    }
}

export const updateImageUser = (imageUser) => {
    return{
        type: 'UPDATE_IMAGE_USER',
        imageUser
    }

}