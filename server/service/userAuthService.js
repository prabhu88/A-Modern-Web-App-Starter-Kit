var userAuthAction  = require('./userAuthAction.js')
function loginService (req,res){
    userAuthAction.login(req,res).then(function(data){
        res.status(201).send(data);
    })
    .catch(function(err){
        res.status(500).send(err);
    })
}

module.exports = {
    login : loginService,   
}