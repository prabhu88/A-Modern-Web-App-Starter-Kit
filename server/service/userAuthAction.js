var Promise = require('bluebird')
const db = require('../db/common/dbUtil')
const log = require('../utility/logger').logger
const {OFFLINE_TOOL_DB,STATUS_CD_ZERO} = require('../utility/constants')
function login(req,res){    
    let username = req.body.username ? req.body.username :  ''
    let password = req.body.password ? req.body.password : ''
    let query = "SELECT * FROM user_login where username = '"+username+"' and password = '"+password+"'";
    return new Promise(function(resolve,reject){
        log.log("info", "Entering userAuthAction.js :: login Function");
        return db.fetchAll(query,OFFLINE_TOOL_DB).then((rows,err)=>{
            if(err){
                reject({ error: err, statusCd: STATUS_CD_ZERO });
            }
            if(rows.length > 0){
                resolve({error_state : false,data : rows})
            }   
            resolve({ error_state : true,error: 'username or password incorrect', statusCd: STATUS_CD_ZERO });
        })
    })
}
module.exports = {
    login : login    
}