export const LIST_ALL = 'LIST_ALL';
export const SAVE_TASK = 'SAVE_TASK';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const OPEN_FORM = 'OPEN_FORM';
export const UPDATE_STATUS_TASK = 'UPDATE_STATUS_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const FILTER_TABLE = 'FILTER_TABLE';
export const SEARCH = 'SEARCH';
export const SORT = 'SORT';

var initialState = false; // close form

export default function(state = initialState, action){
    switch(action.type){
        case TOGGLE_FORM:
            return !state;
        case OPEN_FORM:
            return true;
        case CLOSE_FORM:
            return false;
        default: 
            return state;
    }
};