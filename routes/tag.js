const router = require('express').Router()
const Controller = require('../controllers/tag');
const {saveFile} = require('../utils/gallery')
router.route('/')
        .get(Controller.getAll)
        .post(saveFile,Controller.add)
router.route('/:id')
    .delete(Controller.drop)
    .get(Controller.getById)
    .patch(saveFile,Controller.patch)
module.exports = router;