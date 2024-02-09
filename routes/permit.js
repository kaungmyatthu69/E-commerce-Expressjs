const router = require('express').Router();
const Controller = require('../controllers/permit');
const {validateBody, validateParams} = require("../utils/validator");
const {PermitSchema, AllSchema} = require("../utils/schema");

router.post('/',validateBody(PermitSchema.add),Controller.add);
router.get('/',Controller.getAll);
router.route('/:id')
    .get(validateParams(AllSchema.id,'id'),Controller.getById)
    .patch(validateBody(PermitSchema.add),Controller.update)
    .delete(Controller.drop);
module.exports = router;