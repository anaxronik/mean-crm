const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// GET /api/order?offset=2&limit=5
module.exports.getAll = async (req, res) => {
  try {
    const query = { user: req.user.id }
    const offset = +req.query.offset
    const limit = +req.query.limit
    if (req.query.start) {
      query.date = {
        $gte: req.query.start, // >= start
      }
    }
    if (req.query.end) {
      if (!query.date) {
        query.date = {}
      }
      query.date['$lte'] = req.query.end
    }
    if (req.query.order) {
      query.order = +req.query.order
    }

    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(offset)
      .limit(limit)
    res.status(201).json({ message: 'ok', orders })
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id })
    res.status(201).json({ message: 'ok', order })
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({}).sort({ date: -1 })
    const lastOrderNumber = lastOrder ? lastOrder.order : 0
    const order = await new Order({
      order: lastOrderNumber + 1,
      list: req.body.list,
    }).save()
    res.status(201).json({ message: 'order created', order })
  } catch (error) {
    errorHandler(res, error)
  }
}
