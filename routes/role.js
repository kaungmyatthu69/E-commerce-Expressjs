const router = require('express').Router();
const Controller = require('../controllers/role');
const {validateBody, validateParams} = require("../utils/validator");
const {PermitSchema, AllSchema, RoleSchema} = require("../utils/schema");

router.get('/',Controller.getAll);
router.post('/',validateBody(PermitSchema.add),Controller.add);

router.post('/add/permit',validateBody(RoleSchema.addPermit),Controller.addPermit);
router.post('/remove/permit',validateBody(RoleSchema.addPermit),Controller.removePermit);

router.route('/:id')
    .get(validateParams(AllSchema.id,'id'),Controller.getById)
    .patch(validateParams(AllSchema.id,'id'),validateBody(PermitSchema.add),Controller.update)
    .delete(validateParams(AllSchema.id,'id'),Controller.drop);
module.exports = router;