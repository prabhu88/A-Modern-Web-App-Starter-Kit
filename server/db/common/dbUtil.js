const sqlite3 = require('sqlite3').verbose();
const { DB_PATH, DB_EXT } = require('../../utility/constants');
const Promise = require("bluebird");
const logger = require('../../utility/logger').logger;

function getConnection(gstin) {
    const dbObj = new sqlite3.Database(DB_PATH + gstin.toUpperCase() + DB_EXT);
    logger.log('info', 'getconnection new connection::' + gstin);
    return dbObj;
}

function connect() {
    return new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.log('Could not connect to database', err);
        } else {
            console.log('Connected to database' + DB_PATH);
        }
    });
}

/** Fetch all the records of sql statment
 * @param  {} sql
 */
 function fetchAll(sql, dbName) {
    logger.log("info", "here DBpath::" + DB_PATH + dbName.toUpperCase() + DB_EXT);
    logger.log("info", "here sql::" + sql);

    let db = new sqlite3.Database(DB_PATH + dbName.toUpperCase() + DB_EXT);

    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.all(sql, function (err, rows) {
                db.close();
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    // console.log("rows "+ JSON.stringify(rows));
                    resolve(rows);
                }
            });
        });

    })
}

module.exports = {
    connect: connect,
    getConnection : getConnection,
    fetchAll : fetchAll
    
}