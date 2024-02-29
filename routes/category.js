const router = require('express').Router();
const Controller = require('../controllers/category')
const {saveFile} = require('../utils/gallery')
router.post('/',saveFile,Controller.add);
router.get('/',Controller.getAll)
router.route('/:id')
    .get(Controller.getById)
    .delete(Controller.drop)
    .patch(saveFile,Controller.patch)
module.exports = router;
