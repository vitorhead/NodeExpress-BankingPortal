const express = require('express')
const router = express.Router()
const { accounts, writeJSON } = require('../data')

router.get('/transfer', (req, res) => res.render('transfer'))
router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }))

router.post('/transfer', (req, res) => {
    const { from, to, amount } = req.body
    accounts[from].balance -= amount
    accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount)

    writeJSON()
    res.render('transfer', { message: 'Transfer Completed' })
})

router.post('/payment', (req, res) => {
    const { amount } = req.body
    accounts.credit.balance -= amount
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(amount)

    writeJSON()
    res.render('payment', { message: 'Payment completed', account: accounts.credit })
})

module.exports = router