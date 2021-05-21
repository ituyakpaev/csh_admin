const SETTINGS = {
    media: {
        accepted_img: ['image/jpg', 'image/png', 'image/png', 'image/jpeg'],
        accepted_url: ['www.youtube.com']
    },
    types_field: [
        {
            value: 'text',
            title: 'Текстовое поле'
        },
        {
            value: 'number',
            title: 'Число'
        },
        {
            value: 'html',
            title: 'Текстовое поле (большое)'
        },
        {
            value: 'bool',
            title: 'Чекбокс'
        },
        {
            value: 'select',
            title: 'Поле со списком'
        },
        {
            value: 'multi_select',
            title: 'Мультисписок'
        },
    ],
    defaults: {
        category: {
            // name, handle, parent_handle is optional and required
            description: '',
            sort: '',
            type: 'manual',
            img: "",
            recursive: true,
            show: true
        },
        productField: {
            name: '',
            show: true,
            search_index: true,
            type_field: 'text',
            link: ''
        },
        productFieldValue: {
            title: '',
            link: ''
        },
        productVariant: {
            title: '',
            link: '',
            sku: '',
            weight: '',
            barcode: '',
            dimensions: '',
            media: [],
            options: []
        },
        productPrice: {
            title: '',
            link: '',
            show: true,
            type: 'single'
        },
        forms_field: {
            title: '',
            type: 'text',
            required: false,
            client_editable: true,
            admin_editable: true,
            values: []
        },
        blog: {
            title: '',
            link: '',
            comments_enabled: true,
            check_comment: false,
            captcha_enabled: false,
            accept_link: false
        },
        language: {
            language_code: '',
            name_in_native_language: '',
            name: ''
        }

    },
    validate_templates: {
        link: [
            {
                regexp: /^[0-9a-zA-Z.,-_]+$/,
                title: 'Только латиница, цифры, точки, запятые и дефисы'
            }
        ],
        email: [
            {
                regexp: /^[0-9a-zA-Z.@_-]+$/,
                title: 'Только цифры, латиница и .@-_'
            }
        ]
    },
    currencies: [
        {
            link: 'RUB',
            sign: 'р',
            title: 'Российский рубль',
            value: 'rub'
        },
        {
            link: 'USD',
            sign: '$',
            title: 'United States Dollar',
            value: 'usd'
        },
    ],
    languages: [
        {
            language_code: 'en',
            value: 'en',
            title: 'English',
            name: 'English',
            name_in_native_language: 'Английский'
        },
        {
            language_code: 'ru',
            value: 'ru',
            title: 'Русский',
            name: 'Русский',
            name_in_native_language: 'Русский'
        },
        {
            language_code: 'po',
            value: 'po',
            title: 'Polska',
            name: 'Polska',
            name_in_native_language: 'Польский'
        }
    ],
    timezones: [
        {
            title: 'UTC -12',
            value: 'UTCm12'
        },
        {
            title: 'UTC -11',
            value: 'UTCm11'
        },
        {
            title: 'UTC -10',
            value: 'UTCm10'
        },
        {
            title: 'UTC -9:30',
            value: 'UTCm930'
        },
        {
            title: 'UTC -9',
            value: 'UTCm9'
        },
        {
            title: 'UTC -8',
            value: 'UTCm8'
        },
        {
            title: 'UTC -7',
            value: 'UTCm7'
        },
        {
            title: 'UTC -6',
            value: 'UTCm6'
        },
        {
            title: 'UTC -5',
            value: 'UTCm5'
        },
        {
            title: 'UTC -4',
            value: 'UTCm4'
        },
        {
            title: 'UTC -3:30',
            value: 'UTCm330'
        },
        {
            title: 'UTC -3',
            value: 'UTCm3'
        },
        {
            title: 'UTC -2',
            value: 'UTCm2'
        },
        {
            title: 'UTC -1',
            value: 'UTCm1'
        },
        {
            title: 'UTC 0',
            value: 'UTC0'
        },
        {
            title: 'UTC +1',
            value: 'UTCp1'
        },
        {
            title: 'UTC +2',
            value: 'UTCp2'
        },
        {
            title: 'UTC +3',
            value: 'UTCp3'
        },
        {
            title: 'UTC +3:30',
            value: 'UTCp330'
        },
        {
            title: 'UTC +4',
            value: 'UTCp4'
        },
        {
            title: 'UTC +4:30',
            value: 'UTCp430'
        },
        {
            title: 'UTC +5',
            value: 'UTCp5'
        },
        {
            title: 'UTC +5:30',
            value: 'UTCp530'
        },
        {
            title: 'UTC +5:45',
            value: 'UTCp545'
        },
        {
            title: 'UTC +6',
            value: 'UTCp6'
        },
        {
            title: 'UTC +6:30',
            value: 'UTCp630'
        },
        {
            title: 'UTC +7',
            value: 'UTCp7'
        },
        {
            title: 'UTC +8',
            value: 'UTCp8'
        },
        {
            title: 'UTC +8:45',
            value: 'UTCp845'
        },
        {
            title: 'UTC +9',
            value: 'UTCp9'
        },
        {
            title: 'UTC +9:30',
            value: 'UTCp930'
        },
        {
            title: 'UTC +10',
            value: 'UTCp10'
        },
        {
            title: 'UTC +10:30',
            value: 'UTCp1030'
        },
        {
            title: 'UTC +11',
            value: 'UTCp11'
        },
        {
            title: 'UTC +12',
            value: 'UTCp12'
        },
        {
            title: 'UTC +12:45',
            value: 'UTCp1245'
        },
        {
            title: 'UTC +13',
            value: 'UTCp13'
        },
        {
            title: 'UTC +14',
            value: 'UTCp14'
        }
    ]
}

export default SETTINGS

export const mapSettings = function(map) {
    Object.keys(map).map(item => {
        map[item](SETTINGS)
    })
}
