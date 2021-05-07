import moment from 'moment'

const str = "12/02/2021"

const m = moment(str, 'DD/MM/YYYY', true)

console.log(m.isValid())