var express = require('express');
var router = express.Router();
var db = require('../common/database');


//배송 저장
router.post('/', function(req, res){
    
       try {
        var callbackResult;
        var sql = "call ecolo9ger.sp_delivery_ins(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);select @code"; //11
         var value = JSON.parse(req.body.pData);
         value = [
            value.p_ord_code,
            value.p_ords_code,
            value.p_deli_ordCusCode,
            value.p_deli_recvCusCode,
            value.p_deli_state,
            value.p_deli_proCode,
            value.p_deli_proCount,
            value.p_deli_number,
            value.p_deli_price,
            value.p_deli_memo,
            value.p_deli_reqDate,
            value.p_deli_lstWriter           
         ];
         db.dbProcPut(sql, value, function (err, result) {
           if (err) {
             res.status(500).send({
               error: 'database 연결에 문제가 발생했습니다.'
             });
           } else {           
            res.send(result[1]);
           }
     
         });
     
       } catch (error) {
         res.send("500", {
           error: '파라미터 값이 올바르지 않습니다.'
         });
       }    
    });

    //배송지 수정
    router.put('/', function(req, res){
      /*
      in p_deli_code char(10),
in p_deli_recvCusCode char(10),
in p_deli_proCode char(6) ,
in p_deli_proCount int(11) ,
in p_deli_number varchar(50) ,
in p_deli_price int(11) ,
in p_deli_memo varchar(500) ,
in p_deli_reqDate datetime ,
in p_deli_lstWriter varchar(256)
      */
         try {
          var callbackResult;
          var sql = "call ecolo9ger.sp_delivery_udt(?, ?, ?,?, ?, ?, ?, ?, ?, ?);"; //9
           var value = JSON.parse(req.body.pData);
           value = [
              value.p_deli_code,
              value.p_deli_recvCusCode,
              value.p_deli_state,
              value.p_deli_proCode,
              value.p_deli_proCount,
              value.p_deli_number,
              value.p_deli_memo,
              value.p_deli_reqDate,
              value.p_deli_price,
              value.p_deli_lstWriter        
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

    //배송지 삭제
    router.delete('/', function(req, res){
      
         try {
          var callbackResult;
          
          var sql = "call ecolo9ger.sp_delivery_del(?);"; //11
          var value = JSON.parse(req.body.pData);
          value = [
            value.ID];
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

      //배송지 가져오기
router.get('/', function(req, res){
  /*

  */
      var sql = "call ecolo9ger.sp_delivery_sel(?,?,?,?,?,?,?);";
      var value = [
        // req.query.p_ord_code == null ? '':  req.query.p_ord_code, 
        // req.query.p_cus_name == null ? '':  req.query.p_cus_name, 
        // req.query.p_ord_depositor == null ? '':  req.query.p_ord_depositor,
        // req.query.p_ord_dateForm == '' ? null:  req.query.p_ord_dateForm,
        // req.query.p_ord_dateTo == '' ? null:  req.query.p_ord_dateTo,
        // req.query.p_ord_collDate == '' ? null:  req.query.p_ord_collDate,
        // req.query.p_ord_collState == null ? '':  req.query.p_ord_collState, 
        // req.query.p_deli_state = null ? '': req.query.p_deli_state

        /*
p_ord_code
p_deli_code
p_orderName
p_orderName
p_recvName
p_ord_dateForm
p_ord_dateTo
p_orderState

        */

        req.query.p_ord_code == null ? '':  req.query.p_ord_code, 
        req.query.p_deli_code == null ? '':  req.query.p_deli_code, 
        req.query.p_orderName == null ? '':  req.query.p_orderName, 
        req.query.p_recvName == null ? '':  req.query.p_recvName, 
        req.query.p_ord_dateForm == '' ? null:  req.query.p_ord_dateForm,
        req.query.p_ord_dateTo == '' ? null:  req.query.p_ord_dateTo,
        req.query.p_orderState = null ? '': req.query.p_orderState
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

    //배송 상태값 변경
    router.put('/status', function(req,res){
      try {
           var sql = "update orders set ord_state = ? where ord_code = ?;"; 
              sql += 'update delivery set deli_number = ? where deli_code = ?;';

            var value = JSON.parse(req.body.pData);
            value = [
              value.p_ord_status,
             value.p_ord_code, 
             value.p_deli_number,         
             value.p_deli_code
            ];
            db.dbProcPut(sql, value, function (err, result) {
              if (err) {
                console.error(err);
                res.status(500).send({
                  error: 'database 연결에 문제가 발생했습니다.'
                });
              } else {
               console.log(result);
                res.send(result);
              }
        
            }) 
        
          } catch (error) {
            res.send("500", {
              error: '파라미터 값이 올바르지 않습니다.'
            });
          }
       });
     

  module.exports = router;