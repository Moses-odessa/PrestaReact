const LANG = {
    'Select Category': {
        'RU': 'Выберите категорию',
        'UA': 'Виберіть категорію'
    },
    'Select Shop': {
        'RU': 'Выберите магазин',
        'UA': 'Виберіть магазин'
    },    
    'Description': {
        'RU': 'Описание',
        'UA': 'Опис'
    },
    'Features': {
        'RU': 'Спецификации',
        'UA': 'Специфікації'
    },
    'Images': {
        'RU': 'Изображения',
        'UA': 'Зображення'
    },
}


export function getLangTitle(lang, title) {
    let result = title
    if(!!LANG[title] && !!LANG[title][lang]) {
        result = LANG[title][lang]
    }
    return result
}
