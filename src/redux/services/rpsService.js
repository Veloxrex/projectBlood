import config from 'config';
import { authHeader } from './authHeader';

export const rpsService = {
    create,
    findUser,
    getAll,
};

export function create(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${config.apiUrl}/events/create`, requestOptions).then(handleResponse);
}

export function findUser(userName)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(userName)
    };
    return fetch(`${config.apiUrl}/events/findUser`, requestOptions).then(handleResponse);
}

export function getAll(userName)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(userName)
    };
    return fetch(`${config.apiUrl}/events/getAll`, requestOptions).then(handleResponse);
}

export function handleResponse(response)
{
    return response.text().then(text => {
        return text && JSON.parse(text);
    });
}