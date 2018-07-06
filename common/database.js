var mysql = require('mysql');


var database = {
    pool: mysql.createPool({
        connectionLimit: 1,
        multipleStatements: true,
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
     //   port: 3306,
        database: 'sagrakdam_01',
        dateStrings: 'date'
    }),
    connection: function (callback) {

        try {
            if (!database.pool) {
                callback(err, conn)
                return;
            }
            database.pool.getConnection(function (err, conn) {
                if (err) {
                    callback(err, conn)
                    if (conn) {
                        conn.release();
                    }
                    return;
                }
                console.log('db connction ID: ' + conn.threadId);
                callback(err, conn)
            })
        } catch (error) {
            console.log(error);
        }

    },

    //조회
    dbProcSelect : function (sql, param, callback) {
        database.connection(function (err, conn) {
            if (err) {
                console.log(err.message);
                return callback(err, conn);

            }

            //db연결 성공이면
            var rownum;
            var exec = conn.query(sql, param, function (err, rows) {
                conn.release();
                if (err) {                   
                    console.log(err.message);
                    return callback(err, rows);
                }
                console.log('running sql: ' + exec.sql);
                rownum = rows.length;              
                callback(err, rows);
            });

        })
    },

    dbProcPut: function(sql, param, callback) {

        database.connection(function (err, conn) {
            if (err) {
                console.log(err.message);
                return callback(err, conn);
            }
            
            //db연결 성공이면
            var rownum;
            var exec =  conn.query(sql, param, function (err, rows) {
                if (!err) {
                    console.log('running sql: ' + exec.sql);
                    rownum = rows.affectedRows;
                }
                conn.release();
                callback(err, rows);
            });

        })
    }


};

module.exports = database;