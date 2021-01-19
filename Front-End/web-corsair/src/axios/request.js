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
    console.log(JSON.stringify(postBody))
    return fetch(adress, { 
        method: 'POST', 
        headers: new Headers({
          'Authorization': 'Basic '+ btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`), 
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify(postBody),
    }).then(res => res.json());
}