// Converte uma string no formato 'dd/mm/aaaa' para um objeto do tipo Date
function stringToDate(dateString) {
    const [dd, mm, yyyy] = dateString.split("/")
    return new Date(`${yyyy}-${mm}-${dd} GMT-0300`)
}

// Garante que um objeto é do tipo Date e, caso não for, converte para Date
function convertToDate(obj) {
    if (obj === null) { return null }

    if (obj instanceof Date) {
        return obj
    }
    return stringToDate(obj)
}

// Transforma uma string que representa o número no formato BR para
// um número em formato interno do node (Americano).
// Exemplo: 1.234,56 -> 1234.56
function stringToNumber(str) {
    let strAlterada = str.replace(/\./g, "")
    strAlterada = strAlterada.replace(",", ".")

    return parseFloat(strAlterada)
}

export { convertToDate, stringToNumber }
