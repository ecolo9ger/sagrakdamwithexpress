var express = require('express');
var router = express.Router();
var db = require('../common/database');


//고객등록
router.post('/', function(req,res){
  try {
      var sql = "call ecolo9ger.sp_customers_ins(?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?);select @code";
       var value = JSON.parse(req.body.pData);
       value = [
         value.p_cus_name,
         value.p_cus_email,
         value.p_cus_nickName,
         value.p_cus_type,
         value.p_cus_phone1,
         value.p_cus_phone2,
         value.p_cus_level,
         value.p_cus_zipcode,
         value.p_cus_address,
         value.p_cus_deatilAddress,
         value.p_cus_jibunAddress,
         value.p_cus_zone,
         value.p_cus_detailZone,
         value.p_cus_memo,
         value.p_cus_lstWriter          
       ];
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


router.put('/', function(req,res){
   try {
       var sql = "call ecolo9ger.sp_customers_udt(?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?);";
        var value = JSON.parse(req.body.pData);
        value = [
          value.p_cus_code,
          value.p_cus_name,
          value.p_cus_email,
          value.p_cus_nickName,
          value.p_cus_type,
          value.p_cus_phone1,
          value.p_cus_phone2,
          value.p_cus_level,
          value.p_cus_zipcode,
          value.p_cus_address,
          value.p_cus_deatilAddress,
          value.p_cus_jibunAddress,
          value.p_cus_zone,
          value.p_cus_detailZone,
          value.p_cus_memo,
          value.p_cus_lstWriter          
        ];
        db.dbProcPut(sql, value, function (err, result) {
          if (err) {
            res.status(500).send({
              error: 'database 연결에 문제가 발생했습니다.'
            });
          } else {
           console.log(result);
            res.send(result);
          }
    
        }) ;
    
      } catch (error) {
        res.send("500", {
          error: '파라미터 값이 올바르지 않습니다.'
        });
      }
});



// /* GET users listing. 전체*/
// router.get('/', function (req, res, next) {
//   var sql = "call ecolo9ger.sp_customers_fineOne(?);";
//   db.dbProcSelect(sql, '', function (err, result) {
//     if (err) {
//       res.status(500).send("database error");
//     } else {
//       res.send(result[0]);
//     }
//   });
// });


router.get('/:name', function (req, res) {
  var sql = "call ecolo9ger.sp_customers_fineOne(?);";
  var value = [req.params.name];

  db.dbProcSelect(sql, value, function (err, result) {
    if (err) {
      res.status(500).send("database error");
    } else {
      res.send(result[0]);
    }
  });
});


//검색결과 가져오기
router.get('/search/query', function(req, res){
/*

*/
  var sql = "call ecolo9ger.sp_customers_sel(?, ?, ?, ?);";
  var value = [
    // req.query.p_ord_code == null ? '':  req.query.p_ord_code, 
    // req.query.p_cus_name == null ? '':  req.query.p_cus_name, 
    // req.query.p_ord_depositor == null ? '':  req.query.p_ord_depositor,
    // req.query.p_ord_dateForm == '' ? null:  req.query.p_ord_dateForm,
    // req.query.p_ord_dateTo == '' ? null:  req.query.p_ord_dateTo,
    // req.query.p_ord_collDate == '' ? null:  req.query.p_ord_collDate,
    // req.query.p_ord_collState == null ? '':  req.query.p_ord_collState, 
    // req.query.p_deli_state = null ? '': req.query.p_deli_state

    
    req.query.p_cus_code == null ? '':  req.query.p_cus_code, 
    req.query.p_cus_name == null ? '':  req.query.p_cus_name, 
    req.query.p_cus_phone == null ? '':  req.query.p_cus_phone, 
    req.query.p_cus_regiYear == null ? '':  req.query.p_cus_regiYear
  ];

  db.dbProcSelect(sql, value, function (err, result) {
    if (err) {
      console.log(sql);
      console.error(err);
      res.status(500).send("database error");
    } else {
      res.send(result[0]);
    }
  });
});

      

module.exports = router;