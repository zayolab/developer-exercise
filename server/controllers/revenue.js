const Revenue = require("../models/Revenue")

exports.getRevenues = (req, res) => {
  Revenue.findAll()
    .then(revenue => {
      res.json({ success: true, res: revenue })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}

exports.addRevenue = (req, res) => {
  Revenue.create(req.body)
    .then(data => {
      res.status(201).json({ success: true, res: data })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}

exports.updateRevenue = (req, res) => {
  Revenue.update(req.body, {
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

exports.deleteRevenue = (req, res) => {
  Revenue.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ success: true })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ success: false, error })
    })
}
