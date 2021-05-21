export const query = function(q) {
    if (q && Object.keys(q).length !== 0) {
        let params = new URLSearchParams()
        Object.keys(q).map(key => {
            params.append(key, q[key])
        })
        return '?' + params.toString()
    } else {
        return ''
    }
}

export const URL = 'https://api.alinamakarova.ru/api/v1/'

export const DOMAIN = 'https://alinamakarova.ru'
