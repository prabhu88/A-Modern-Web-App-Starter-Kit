var express = require('express')
var router = express.Router()
const logger = require('../utility/logger').logger
const {login} = require('../service/userAuthService')


router.post('/login',function(req,res){
    logger.log("info", "Entering routes::: userAuthRouter :: /login : %s");
    login(req,res)
    logger.log("info", "Exiting routes::: userAuthRouter :: /login : %s");
})


module.exports = router;