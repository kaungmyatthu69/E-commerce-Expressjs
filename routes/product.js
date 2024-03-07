const router = require('express').Router();
const Controller = require('../controllers/product');
const {saveFiles} = require('../utils/gallery')




router.route('/')
        .get(Controller.getAll)
    .post(saveFiles,Controller.add)

router.route('/:id')
    .delete(Controller.drop)
    .get(Controller.getById)
    .patch(Controller.patch)

router.get('/paginate/:pageNumber',Controller.paginate)
router.get('/paginate/filter/:type/:pageNumber/:id',Controller.filter)




module.exports = router;