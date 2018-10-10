const LANG = {
    'Select Category': {
        'RU': 'Выберите категорию',
        'UA': 'Виберіть категорію'
    },
    'Select Shop': {
        'RU': 'Выберите магазин',
        'UA': 'Виберіть магазин'
    },
    'Delete': {
        'RU': 'Удалить',
        'UA': 'Видалити'
    },
    'Edit': {
        'RU': 'Редактировать',
        'UA': 'Редагувати'
    },
}


export function getLangTitle(lang, title) {
    let result = title
    if(!!LANG[title] && !!LANG[title][lang]) {
        result = LANG[title][lang]
    }
    return result
}
