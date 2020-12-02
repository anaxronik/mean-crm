const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()
const upload = require('../midleware/upload')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.post('/', upload.single('image'), controller.create)
router.patch('/:id', upload.single('image'), controller.updateById)

module.exports = router
