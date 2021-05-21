import axios from 'axios'
import store from '../plugins/store'

let instance = axios.create()

instance.interceptors.request.use(function(config) {
    // set session cookie to request
    if (!config.headers.common['Authorization']) {
        config.headers.common['Authorization'] = store.state.SESSION
    }
    return config
})

instance.interceptors.response.use(
    res => {
        return res
    },
    err => {
        let error = {
            code: 0, // deprecated
            status: 0,
            error_code: 0,
            message: '',
            description: '',
            err: err
        }
        if (err.response) {
            error.status = err.response.status
            error.code = err.response.status
            if (error.status === 404) {
                error.message = 'Сущность не найдена'
                error.description = 'Вероятно, вы перешли по неправильной ссылке.'
            } else if (error.status === 422) {
                error.message = 'Ошибка валидации'
                error.description = 'Сервер вернул данные как неправильные. Вероятнее всего, мы не предусмотрели это, и поэтому не сказали вам об этом раньше.'
            } else if (error.status === 403) {
                error.message = "Похоже, у вас нет прав на эту операцию"
            } else {
                error.message = 'Неизвестная ошибка'
            }
        } else {
            if (err.message === 'Network Error') { // cors or internet connection
                error.message = 'Ошибка сети'
                error.description = ''
            } else {
                error.message = err.message
                error.description = 'Неизвестная ошибка'
            }
        }

        if (error.status === 400) { // any data error
            error.message = err.response.data.detail.message
            error.error_code = err.response.data.detail.code
        }
        if (error.status === 401) {
            store.commit('setAuth', { state: false })
        }

        throw error
    }
)

export default instance;
