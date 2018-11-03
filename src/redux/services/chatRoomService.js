import config from 'config';
import { authHeader } from './authHeader';

export const chatRoomService = {
    getAll,
    create,
    uploadImage
};

export function create(room) {
    let formData = new FormData();
    formData.append('name',room.name);
    formData.append('image',room.image);
    formData.append('imageFile', room.imageFile);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };
    return fetch(`${config.apiUrl}/chats/add`, requestOptions).then(handleResponse);
}

export function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/chats/getAll`, requestOptions).then(handleResponse);
}

export function handleResponse(response) {
    return response.text().then(text => {
        return text && JSON.parse(text);
    });
}

export function uploadImage(selectedFile) {
    let formData = new FormData();
    formData.append('selectedFile', selectedFile);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };

    return fetch(`${config.apiUrl}/chats/uploadImage`, requestOptions).then(handleResponse);
}
