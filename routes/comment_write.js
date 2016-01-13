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
     var comment_idx= req.comment_idx;
    
  	 connection.query('insert into comment(user_idx,comment_contents,comment_regdate) values(?,?,?)  ;', [req.body.user_idx,req.body.comment_contents,req.body.comment_regdate ], function (error, info) {
        if (error == null) {
            connection.query('select * from comment where comment_idx=?;', [req.body.comment_idx], function (error, cursor) {
                if (cursor.length > 0) {
                    res.json({
                        result : true, 
                        
			Usernick : cursor[0].user_idx,
                       CommentContents : cursor[0].comment_contents,
                        BoardTitle : cursor[0].board_title,
                       CommentRegdate : cursor[0].,comment_regdate,
                    });
                }
                else
                    res.status(503).json({ result : false, reason : "Cannot post article" });
            });
        }
        else
            res.status(503).json(error);
    });
});

module.exports = router;
