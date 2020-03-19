const mysql = require('mysql');

const pool = mysql.createPool({
    host: '39.106.114.228',
    user: 'root',
    password: 'xh2391lyf',
    database: 'test'
});
let query = function( sql ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
                if (err) {
                reject( err )
            } else {
                connection.query(sql, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};
module.exports = query;

