const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({
    new: true,
    runValidators: true
})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({
                errors: [error]
            })
        } else {
            res.json({
                value
            })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: {
            credit: {
                $sum: "$credits.value" //somar todos os creditos relacionado a um faturamento
            },
            debt: {
                $sum: "$debts.value"
            }
        }
    }, {
        $group: {
            _id: null,
            credit: {
                $sum: "$credit" //somar todos os creditos relacionado a todos os faturamentos, utilizando o $project anterior
            },
            debt: {
                $sum: "$debt"
            }
        }
    }, {
        $project: {
            _id: 0, //false
            credit: 1, //true
            debt: 1
        }
    }, (error, result) => {
        if (error) {
            res.status(500).json({
                errors: [error]
            })
        } else {
            res.json(result[0] || {
                credit: 0,
                debt: 0
            })
        }
    })
})

module.exports = BillingCycle