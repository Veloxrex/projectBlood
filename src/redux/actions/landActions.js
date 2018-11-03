import { landService } from '../services/landService';
import alertActions from './alertActions';
import GoogleTileMap from "../../containers/google_map/components/GoogleTileMap";

export const PURCHASE_REQUEST = 'LANDS_PURCHASE_REQUEST';
export const PURCHASE_SUCCESS = 'LANDS_PURCHASE_SUCCESS';
export const PURCHASE_FAILURE = 'LANDS_PURCHASE_FAILURE';

export const LANDS_GETALL_REQUEST = 'LANDS_GETALL_REQUEST';
export const LANDS_GETALL_SUCCESS = 'LANDS_GETALL_SUCCESS';
export const LANDS_GETALL_FAILURE = 'LANDS_GETALL_FAILURE';

export const LANDS_DELETE_REQUEST = 'LANDS_DELETE_REQUEST';
export const LANDS_DELETE_SUCCESS = 'LANDS_DELETE_SUCCESS';
export const LANDS_DELETE_FAILURE = 'LANDS_DELETE_FAILURE';

export const landActions = {
    purchase,
    getAll,
    delete: _delete
};

function purchase(lands)
{
    return dispatch =>
    {
        dispatch(request(lands));
        landService.purchase(lands)
        .then(
            lands => {
                dispatch(success(lands));
                GoogleTileMap.reload(window.mainMap);
                dispatch(alertActions.success('Purchase lands successful'));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() { return { type: PURCHASE_REQUEST } }
    function success(lands) { return { type: PURCHASE_SUCCESS, lands } }
    function failure(error) { return { type: PURCHASE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        landService.delete(id)
            .then(
                lands => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: LANDS_DELETE_REQUEST, id } }
    function success(id) { return { type: LANDS_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: LANDS_DELETE_FAILURE, id, error } }
}

function getAll(userName)
{
    return dispatch =>
    {
        dispatch(request(userName));
        landService.getAll(userName)
            .then(
                lands => dispatch(success(lands)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(userName) { return { type: LANDS_GETALL_REQUEST, userName } }
    function success(lands) { return { type: LANDS_GETALL_SUCCESS, lands} }
    function failure(error) { return { type: LANDS_GETALL_FAILURE, error } }
}