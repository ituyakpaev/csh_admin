import axios from '../../../instanse'
import { URL, query } from '../../../helpers'

export default {
    getUsers(q) {
        return axios.get(`${ URL }admin/users${ query({ limit: 25, ...q }) }`)
    },
    getUser(id) {
        return axios.get(`${ URL }users/${ id }`)
    },
    getUserMe() {
        return axios.get(`${ URL }users/me`)
    },
    getToken(id) {
        return axios.post(`${ URL }admin/users/login?user_id=${ id }`)
    },
    updatePassword(user_id, password) {
        return axios.put(`${ URL }admin/change-password/${ query({ user_id  }) }`, password)
    }
}
