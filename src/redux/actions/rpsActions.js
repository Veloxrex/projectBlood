import { rpsService } from '../services/rpsService';
import alertActions from './alertActions';

export const RPS_CREATE_SUCCESS = 'RPS_CREATE_SUCCESS';
export const RPS_CREATE_FAILURE = 'RPS_CREATE_FAILURE';

export const RPS_FINDUSER_SUCCESS = 'RPS_FINDUSER_SUCCESS';
export const RPS_FINDUSER_FAILURE = 'RPS_FINDUSER_FAILURE';

export const RPS_GETALL_REQUEST = 'RPS_GETALL_REQUEST';
export const RPS_GETALL_SUCCESS = 'RPS_GETALL_SUCCESS';
export const RPS_GETALL_FAILURE = 'RPS_GETALL_FAILURE';

export const EVENT_INITIAL = 'EVENT_INITIAL';
export const EVENT_USERS_COUNT = 'EVENT_USERS_COUNT';

export const rpsActions = {
    create,
    findUser,
    getAll,
    eventInitial,
    getUsersCount
};

function eventInitial(){
    return {
        type: EVENT_INITIAL,
        eventJoined: false,
        usersCount : 0
    }
}

function getUsersCount(usersCount){
    return {
        type: EVENT_USERS_COUNT,
        usersCount
    }
}

function create(param)
{
    return dispatch => {
        rpsService.create(param)
            .then(
                result =>{
                    dispatch(success(result.event))
                } ,
                error => dispatch(failure(error.toString()))
            );
        };

    function success(event) { return { type: RPS_CREATE_SUCCESS, event } }
    function failure(error) { return { type: RPS_CREATE_FAILURE, error } }
}

function findUser(param)
{
    return dispatch => {
        rpsService.findUser(param)
            .then(
                event => dispatch(success(event)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(event) { return { type: RPS_FINDUSER_SUCCESS, event } }
    function failure(error) { return { type: RPS_FINDUSER_FAILURE, error } }
}

function getAll()
{
    return dispatch => {
        dispatch(request());
        rpsService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: RPS_GETALL_REQUEST } }
    function success(items) { return { type: RPS_GETALL_SUCCESS, items } }
    function failure(error) { return { type: RPS_GETALL_FAILURE, error } }
}