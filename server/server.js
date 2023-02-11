import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const NodeCache = require('node-cache')
var async = require('async')
const fileUpload = require('express-fileupload')
appModulePath.addPath(`${__dirname}`);
const server = express();
const HTTP = http.Server(server);

const winston_logger = require('./utility/logger.js')
var constants = require('./utility/constants.js')
var errorConstant = require('./utility/errorconstants.js')
var userAuthRouter = require('./routes/userAuthRouter.js')
server.use(cors());
server.use(fileUpload({
    createParentPath: true
}))
server.set('myCache', new NodeCache({ stdTTL: 200, checkperiod: 120 }))
async.waterfall([
    (callback) => {
        server.use(bodyParser.json({ limit: '50mb' }));
        server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        server.use(cookieParser());
        server.use(morgan('combined', { stream: winston_logger.stream }));
        server.use('/auth',userAuthRouter);
        server.get('/test', (req, res) => res.status(200).send('success!'));
        server.use('*', function (req, res) {
            res.status(404).send(
                errorConstant.BAD_URL);
            res.end();
        });
        callback(null, true);
    }
],(error,response) =>{
    var log = require('./utility/logger'), logger = log.logger;
    if (error) {        
        logger.log("error", "Error while starting server. Please check error log %s", error.message)
    } else {
        logger.info(`respose ${response}`)
        const port = 9001
        process.on('uncaughtException', function (e) {
            logger.log("error", "UnCaught Exception :: ", e);
        })
        HTTP.listen(
            port,
            () => {
                logger.log("info", "Started NodeJS server For GSTR2B Offline Utility , listening on port :: "+port+" , :: %s , %s", server.get('port'), new Date().getTime(), new Date().toString());
                logger.level = constants.LOG_LEVEL;
            }
        );
    }
})



