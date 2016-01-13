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
     var board_idx = req.board_idx;
    
  	 connection.query('delete from board where board_idx=?) values(?)  ;', [req.body.board_idx], function (error, info) {
        if (error == null) {
             if (cursor.length > 0) {
            res.json({
              result: true,
              
             BoardTitle: cursor[0].board_title,
                BoardContents: cursor[0].board_contents,
                BoardRegdate: cursor[0].board_regdate,
                BoardHit : cursor[0].board_like_count,


            });
             }
        }
        else
            res.status(503).json(error);
    });
});

module.exports = router;
