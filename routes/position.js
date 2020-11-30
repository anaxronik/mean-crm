const express = require('express')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/:categoryId', controller.getAllByCategory)
router.post('/', controller.create)
router.patch('/:id', controller.updateById)
router.delete('/:id', controller.deleteById)

module.exports = router
