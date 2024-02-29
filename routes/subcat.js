const router = require('express').Router()
const Controller = require('../controllers/subCat');
const {saveFile} = require('../utils/gallery')
router.route('/')
        .get(Controller.all)
        .post(saveFile,Controller.add)
router.route('/:id')
    .delete(Controller.drop)
    .get(Controller.getById)
    .patch(saveFile,Controller.patch)
module.exports = router;