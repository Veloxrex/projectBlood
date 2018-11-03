import { gameService } from '../services/gameService';



export const SAVE_NUM_DICE = 'SAVE_NUM_DICE';


export const mapActions = {
    saveNumDice,
};

function saveNumDice(numDice){
    return {
        type: SAVE_NUM_DICE,
        numDice: numDice
    }
}


// function purchase(lands)
// {
//     return dispatch =>
//     {
//         dispatch(request(lands));
//         landService.purchase(lands)
//         .then(
//             lands => {
//                 dispatch(success(lands));
//                 GoogleTileMap.reload(window.mainMap);
//                 dispatch(alertActions.success('Purchase lands successful'));
//             },
//             error => {
//                 dispatch(failure(error.toString()));
//                 dispatch(alertActions.error(error.toString()));
//             }
//         );
//     };

//     function request() { return { type: PURCHASE_REQUEST } }
//     function success(lands) { return { type: PURCHASE_SUCCESS, lands } }
//     function failure(error) { return { type: PURCHASE_FAILURE, error } }
// }

// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));
//         landService.delete(id)
//             .then(
//                 lands => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: LANDS_DELETE_REQUEST, id } }
//     function success(id) { return { type: LANDS_DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: LANDS_DELETE_FAILURE, id, error } }
// }

// function getAll(userName)
// {
//     return dispatch =>
//     {
//         dispatch(request(userName));
//         landService.getAll(userName)
//             .then(
//                 lands => dispatch(success(lands)),
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(userName) { return { type: LANDS_GETALL_REQUEST, userName } }
//     function success(lands) { return { type: LANDS_GETALL_SUCCESS, lands} }
//     function failure(error) { return { type: LANDS_GETALL_FAILURE, error } }
// }