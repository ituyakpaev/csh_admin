import axios from '../../../instanse'
import { URL, query } from "@/middleware/helpers";

export default {
    getList(q) {
        return axios.get(`${ URL }${ query(q) }`)
    },
    get(id, q) {
        return axios.get(`${ URL }${ id }${ query(q) }`)
    },
    create(data, q) {
        return axios.post(`${ URL }${ query(q) }`, data)
    },
    update(id, data, q) {
        return axios.put(`${ URL }${ id }${ query(q) }`, data)
    },
    delete(id, q) {
        return axios.delete(`${ URL }${ id }${ query(q) }`)
    },

    payments: {
        getList(q) {
            return axios.get(`${ URL }${ query(q) }`)
        },
        get(id, q) {
            return axios.get(`${ URL }${ id }${ query(q) }`)
        },
        create(data, q) {
            return axios.post(`${ URL }${ query(q) }`, data)
        },
        update(id, data, q) {
            return axios.put(`${ URL }${ id }${ query(q) }`, data)
        },
        delete(id, q) {
            return axios.delete(`${ URL }${ id }${ query(q) }`)
        },
    }
}
