import config from 'config';
import { authHeader } from './authHeader';

// export const landService = {
//     purchase,
//     getAll,
//     delete: _delete
// };

// export function purchase(land)
// {
//     const requestOptions = {
//         method: 'POST',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(land)
//     };
//     return fetch(`${config.apiUrl}/lands/purchase`, requestOptions)
//         .then(handleResponse)
//         .then(lands => {
//             return lands;
//         });
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// export function _delete(id)
// {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/lands/delete/${id}`, requestOptions).then(handleResponse);
// }


// export function getAll(userName)
// {
//     const requestOptions = {
//         method: 'POST',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(userName)
//     };
//     return fetch(`${config.apiUrl}/lands/getAll`, requestOptions).then(handleResponse);
// }

// export function handleResponse(response)
// {
//     return response.text().then(text => {
//         return text && JSON.parse(text);
//     });
// }