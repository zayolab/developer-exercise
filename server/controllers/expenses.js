const Expense = require("../models/Expense")

exports.getExpenses = (req, res) => {
  Expense.findAll()
    .then(expenses => {
      res.json({ success: true, res: expenses })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}

exports.addExpense = (req, res) => {
  Expense.create(req.body)
    .then(data => {
      res.status(201).json({ success: true, res: data })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}

exports.updateExpense = (req, res) => {
  Expense.update(req.body, {
    where: { id: req.params.id },
    returning: true
  })
    .then(resp => {
      res.json({ success: true, res: resp[1][0].dataValues })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}

exports.deleteExpense = (req, res) => {
  Expense.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ success: true })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}
