var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.post('/', function(req, res, next) {
     var comment_idx = req.comment_idx;
    
  	 connection.query('delete from comment where comment_idx=?)  ;', [req.body.comment_idx], function (error, info) {
        if (error == null) {
             if (cursor.length > 0) {
            res.json(cursor[0]);
            }
             }
        }
        else
            res.status(503).json(error);
    });
});

module.exports = router;
