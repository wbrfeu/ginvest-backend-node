// Converte uma string no formato 'dd/mm/aaaa' para um objeto do tipo Date
function stringToDate(dateString) {
    const [dd, mm, yyyy] = dateString.split("/")
    return new Date(`${yyyy}-${mm}-${dd}`)
}

// Garante que um objeto é do tipo Date e, caso não for, converte para Date
function convertToDate(obj) {
    if (obj instanceof Date) {
        return obj
    }
    return stringToDate(obj)
}

export { convertToDate }
