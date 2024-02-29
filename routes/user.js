const router = require('express').Router();
const Controller = require('../controllers/user');
const {validateBody, validateToken, validateRole} = require("../utils/validator");
const {UserSchema} = require("../utils/schema");
router.post('/register',validateBody(UserSchema.registerUser),Controller.register)
router.post('/login',validateBody(UserSchema.loginUser),Controller.login)
router.post('/add/roles',validateToken,validateRole('Owner'),validateBody(UserSchema.addRole),Controller.addRole)
router.post('/remove/roles',validateToken,validateRole('Owner'),validateBody(UserSchema.addRole),Controller.removeRole)
router.post('/add/permits',validateToken,validateRole('Owner'),validateBody(UserSchema.addPermit),Controller.addPermit)
router.post('/remove/permits',validateToken,validateRole('Owner'),validateBody(UserSchema.addPermit),Controller.removePermit)
module.exports = router;