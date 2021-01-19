import axios from 'axios'

export function get(adress) {
    return axios.get(adress, {
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
    })
}

export function deleteAx(adress) {
    return axios.delete(adress, {
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
    })
}

export function getWithBody(adress, body) {
    return axios.get(adress, {
        params: body,
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
    })
}

export function post(adress, postBody) {
    return axios.post(adress, {
        body: postBody,
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
    })
}