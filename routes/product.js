const router = require('express').Router();
const Controller = require('../controllers/product');
const {saveFiles} = require('../utils/gallery')

router.route('/')
        .get(Controller.getAll)
    .post(saveFiles,Controller.add)

router.route('/:id')
    .delete(Controller.drop)

module.exports = router;