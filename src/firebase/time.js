export const formatTimestamp = (timestamp) => {
    const newDate = new Date(timestamp.seconds * 1000)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()

    return `${day}/${month}/${year}`
}