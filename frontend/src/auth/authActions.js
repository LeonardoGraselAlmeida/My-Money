import {
    toastr
} from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

function submit(valus, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([{
                    type: 'USER_FETCHED',
                    payload: resp.data
                }])
            })
            .catch(e => {
                e.response.data.erros.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

export function logout(values) {
    return {
        type: 'TOKEN_VALIDATED',
        payload: false
    }
}