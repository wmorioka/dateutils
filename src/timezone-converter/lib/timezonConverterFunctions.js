
export const validateDatetimeFormat = (date) => {
    const pattern = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
    if (!pattern.test(date)) return false
    return !isNaN(new Date(date).getTime())
}