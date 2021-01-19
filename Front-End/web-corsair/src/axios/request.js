import axios from 'axios'

export function get(adress) {
    console.log(adress)
    return axios.get(adress, {
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
    })
}

export function post(adress, postBody) {
    return axios.get(adress, {
        auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }, 
        body: postBody
    })
}