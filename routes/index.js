var express = require('express');
var router = express.Router();
var db = require('../common/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/base', function(req, res){
  var sql = "select * from codes_sub;";
  
        db.dbProcSelect(sql,"", function(err, result){
            if(err){
              res.status(500).send("database error");
            }else{
              res.send(result); 
            }
        }) ;
});

module.exports = router;
