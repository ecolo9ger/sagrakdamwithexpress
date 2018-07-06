var express = require('express');
var router = express.Router();
var db = require('../common/database');


//입금확인
router.get('/', function(req, res){
    /*
        in p_ord_code char(10),
        in p_cus_name char(100),
        in p_ord_depositor varchar(100),
        in p_ord_dateForm datetime,
        in p_ord_dateTo datetime,
        in p_ord_collDate datetime
    */
        var sql = "CALL sp_balance_sel(?,?,?,?,?,?,?,?);";
        var value = [
          req.query.p_ord_code == null ? '':  req.query.p_ord_code, 
          req.query.p_cus_name == null ? '':  req.query.p_cus_name, 
          req.query.p_ord_depositor == null ? '':  req.query.p_ord_depositor,
          req.query.p_ord_dateForm == '' ? null:  req.query.p_ord_dateForm,
          req.query.p_ord_dateTo == '' ? null:  req.query.p_ord_dateTo,
          req.query.p_ord_collDate == '' ? null:  req.query.p_ord_collDate,
          req.query.p_ord_collState == null ? '':  req.query.p_ord_collState, 
          req.query.p_deli_state = null ? '': req.query.p_deli_state
        ];
      
        db.dbProcSelect(sql, value, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send("database error");
          } else {
            res.send(result[0]);
          }
        });
      });

//입금 상태 업데이트
router.put('/', function(req, res){
  /*
    value.p_ord_code 
,   alue.p_ord_depositor 
,   alue.p_ord_collState 
,   alue.p_ord_collAmount
,   alue.p_ord_collMemo  
,   alue.p_ord_collDate  
,   alue.p_ord_collAcount

  */
     try {
      var callbackResult;
      var sql = "call ecolo9ger.sp_balance_udt(?, ?, ?, ?, ?, ?, ?,?);"; //9
       var value = JSON.parse(req.body.pData);
       value = [
                value.p_ord_code
            ,   value.p_ord_depositor   
            ,   value.p_ord_collState   
            ,   value.p_ord_collAmount  
            ,   value.p_ord_collMemo    
            ,   value.p_ord_collDate    
            ,   value.p_ord_collAcount 
            ,   value.p_lstWriter     
       ];
       db.dbProcPut(sql, value, function (err, result) {
         if (err) {
           console.error(err);
           res.status(500).send({
             error: 'database 연결에 문제가 발생했습니다.'
           });
         } else {           
           res.send(result);
         }
   
       });
   
     } catch (error) {
       res.send("500", {
         error: '파라미터 값이 올바르지 않습니다.'
       });
     }    
  });


  module.exports = router;