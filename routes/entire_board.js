var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    
    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.get('/:middleClass_idx', function(req, res, next) {

    connection.query('select m.middleClass_name,b.board_contents, u.user_nick, b.board_title, b.board_regdate, b.board_like_count,b.board_contents from board b,user u,middleClass m where b.user_idx=u.user_idx and m.middleClass_idx=b.middleClass_idx and middleClass_idx=?', [req.params.middleClass_idx],function (error, cursor) {
       if (error == null){
           if (cursor.length > 0){res.json(cursor); }
        else   res.status(503).json(error);
       }
    });
});

module.exports = router;