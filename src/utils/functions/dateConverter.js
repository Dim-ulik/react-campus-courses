export const dateToView = (date) => {
    let newDate = '';
    for (let i = 0; i < 10; i++) {
        newDate += date[i];
    }
    return newDate;
}