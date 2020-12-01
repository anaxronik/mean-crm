const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
    res.status(200).json(categories)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id })
    res.status(200).json(category)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.deleteById = async (req, res) => {
  try {
    await Category.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ message: 'category deleted' })
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.create = async (req, res) => {
  try {
    const category = await new Category({
      name: req.body.name,
      imgSrc: req.body.imgSrc,
      user: req.user.id,
    }).save()
    res.status(201).json({ message: 'category created' })
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.updateById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(category)
  } catch (error) {
    errorHandler(res, error)
  }
}
