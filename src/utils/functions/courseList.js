export const getStudyYearsString = (startYear) => {
    return `${startYear}-${startYear + 1}`
}

export const getFreePlaces = (freePlaces) => {
    let places;
    (freePlaces >= 0) ? places = freePlaces : places = 0;
    return places;
}

export const getStatus = (status) => {
    switch (status) {
        case 'Finished':
            return 'Закрыт'
        case 'Created':
            return 'Создан'
        case 'OpenForAssigning':
            return 'Открыт для записи'
        case 'Started':
            return 'В процессе обучения'
        default:
            return '';
    }
}

export const getSemester = (semester) => {
    switch (semester) {
        case 'Spring':
            return 'Весенний'
        case 'Autumn':
            return 'Осенний'
        default:
            return ''
    }
}