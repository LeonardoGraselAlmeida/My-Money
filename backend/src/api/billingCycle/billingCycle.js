const restful = require('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
    name: {type: String, required: [true,'Informe o nome do Crédito!']},
    value: {type: Number, required: [true,'Informe o valor do Crédito!'], min: 0}
})

const debtSchema = new mongoose.Schema({
    name: {type: String, required: [true,'Informe o nome do Débito!']},
    value: {type: Number, required: [true,'Informe o valor do Débito!'], min: 0},
    status: {type: String, required: false, uppercase: true, 
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']}
})

const billingCycleSchama = new mongoose.Schema({
    name: { type: String, required: [true,'Informe o nome do Ciclo de Faturamento!']},
    month: {type: Number, min: 1, max: 12, required: [true,'Informe o mês do Ciclo de Faturamento, valor deve ser entre 1 a 12!']},
    year: {type: Number, min: 1970, max: 2100, required: [true,'Informe o ano do Ciclo de Faturamento, valor deve ser entre 1970 a 2100!']},
    credits: [creditSchema],
    debts: [debtSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchama)