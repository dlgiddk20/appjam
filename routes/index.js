var fs = require('fs');

var express = require('express');
var ejs = require('ejs');
var uuid = require('node-uuid');

var router = express.Router();

// TODO : Load from database.
var test_id = 'dlgiddk20';
var test_pw = 'g0102048';
var user_name = 'Hyang-ah Lee';


router.get('/', function (request, response, next) {
   
   var context = { };
   
   if (request.session.key == undefined) {//화면에 보여주는것만 세션이 키가 정의가 안되있냐?
      
      context.authorized = false;//그렇담 권한을 주지 않겠어
   }
   else {
      
      context.authorized = true;// 정의 되어있으면 권한 ㅇㅇ
      context.user_name = request.session.user_name;
   }
   
   response.render('index', context);//정의 ㄴㄴ 권한 안되있음 정의 ㅇㅇ 권한 ㅇㅇ
});

router.post('/sign_in', function (request, response, next) { // user와패스워드 제출 사인인으로 들어가서 맞는지 안맞는지 확인
   
   if (request.session.key == undefined &&
       request.body.id == test_id && request.body.password == test_pw) {
      
      request.session.key = uuid.v4();//unique user identi 형식을 넘겨줘서 키값을 확인 유저가 맞는지 
      request.session.user_name = user_name;
   }
   
   response.redirect("/");//확인이 끝났으면 get방식으로 확인해서 페이지를 렌더링
});

router.get('/sign_out', function (request, response, next) { // logout을 눌렀을때 사인아웃으로 (논리적인)페이지를 이동 벗 화면엔 안보임
   
   if (request.session.key != undefined) {
      
      request.session.key = undefined;
      request.session.user_name = undefined;
   }
   
   response.redirect("/");
});



module.exports = router;