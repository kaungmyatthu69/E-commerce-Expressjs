const router = require('express').Router();
const Controller = require('../controllers/order');
const {validateToken} = require('../utils/validator')
router.route('/')
        .post(validateToken,Controller.add)
module.exports = router;