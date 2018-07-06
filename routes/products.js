var express = require('express');
var router = express.Router();
var db = require('../common/database');


// Index
router.get('/', function (req, res, next) {
    //var sql = "call sp_products_findAll();";
    var sql = "select * from products";
    db.dbProcSelect(sql, '', function (err, result) {
      if (err) {
        res.status(500).send("database error");
      } else {
        res.send(result);
      }
    });
  });


  //search
router.get('/search', function(req, res){

  var sql = 'select * from products where prod_name like ?';
    var value = [
      req.query.q == null ? '%%':  '%' + req.query.q +'%'
    ];
  
    db.dbProcSelect(sql, value, function (err, result) {
      if (err) {
        console.log(sql);
        console.error(err);
        res.status(500).send("database error");
      } else {
        res.send(result);
      }
    });
  });

  //show

  //product create
router.post('/', function(req,res){
  try {

    var sql = 'insert into products(prod_name, prod_price, prod_discountPrice,';
        sql +=' prod_weight, prod_memo, prod_image, prod_state, prod_createAt)';
        sql += ' values(?, ?, ?, ?, ?,?, ?, sysdate());';
        
       value = [
        req.body.prod_name,
        req.body.prod_price,
        req.body.prod_discountPrice,
        req.body.prod_weight,
        req.body.prod_memo,
        req.body.prod_image,
        req.body.prod_state        
       ];
       console.log(sql);
       db.dbProcPut(sql, value, function (err, result) {
         if (err) {
           console.error(err);
           res.status(500).send({
             error: 'database 연결에 문제가 발생했습니다.'
           });
         } else {
          console.log(result);
           res.send(result[1]);
         }
   
       }) ;
   
     } catch (error) {
       res.send("500", {
         error: '파라미터 값이 올바르지 않습니다.'
       });
     }
});

  //update

  //destroy

  module.exports = router;