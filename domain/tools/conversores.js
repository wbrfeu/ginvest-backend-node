// Converte uma string no formato 'dd/mm/aaaa' para um objeto do tipo Date
function stringToDate(dateString) {
    const [dd, mm, yyyy] = dateString.split("/")
    return new Date(`${yyyy}-${mm}-${dd}`)
}

export { stringToDate }
