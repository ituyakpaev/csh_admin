import settings from '../settings'

export default {
    handle(val) {
        return val.split('').map(sign => {
            let ruTranlit = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
                'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
                'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
                'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
                'щ': 'shch', 'ы': 'y', 'й': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
            }
            sign = sign.toLowerCase()
            if (ruTranlit[sign]) {
                return ruTranlit[sign]
            } else if (sign.match(/[a-z0-9._-]/)) {
                return sign
            } else if (sign.match(/[\s]/)) {
                return '_'
            } else {
                return ''
            }
        }).join('')
    },
    type_field(val) {
        let type = settings.types_field.find(r => r.value === val)
        return type ? type.title : ''
    },
    date(value) {
        let date = new Date(value)
        if (String(date) !== "Invalid Date") {
            return `${ date.getDate() }.${ date.getMonth() }.${ date.getFullYear() }`
        } else {
            return 'invalid date'
        }
    }
}
