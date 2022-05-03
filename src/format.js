export const currency = (number) => {
    return parseInt(number).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}