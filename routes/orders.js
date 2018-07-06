var express = require('express');
var router = express.Router();
var db = require('../common/database');

router.put('/', function(req,res){
  res.send("수정");
});

 //주문서 저장
 router.post('/', function(req, res){
    
       try {
        var callbackResult;
        var sql = "call ecolo9ger.sp_orders_ins(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,@result);select @result;";
         var value = JSON.parse(req.body.pData);
         value = [
            value.p_cus_code,
            value.p_ord_TYSale,
            value.p_ord_date,
            value.p_ord_depositor,
            value.p_ord_toAmount,
            value.p_ord_adjAmount,
            value.p_ord_toAcount,
            value.p_ord_TYcus,
            value.p_ord_director,
            value.p_ord_memo, 
            value.p_ord_recomm,
            value.p_ord_state,
            value.p_ord_collState,
            value.p_ord_collAmount,
            value.p_ord_collMemo,
            value.p_ord_TYColl,
            value.p_ord_collDate, 
            value.p_ord_lstWriter,
            value.p_ord_reservation
         ];
         db.dbProcPut(sql, value, function (err, result) {
           if (err) {
             console.log(err);
             res.status(500).send({
               error: 'database 연결에 문제가 발생했습니다.'
             });
           } else {           
             res.send(result[1]);
           }
     
         });
     
       } catch (error) {
        console.log(err);
         res.send("500", {
           error: '파라미터 값이 올바르지 않습니다.'
         });
       }
    
    });


//주문서 상세저장
 router.post('/detail', function(req, res){  
      try {
      var sql = "call ecolo9ger.sp_orders_sub_ins(?,?, ?, ?,? , ?, ?, ?, ?);select @code;";
       var value = JSON.parse(req.body.pData);
       value = [
        value.p_ord_code,
        value.p_cus_code,
        value.p_pro_code,
        value.p_ords_unitAdjPrice,
        value.p_ords_count,
        value.p_ords_ToAmount,
        value.p_ords_senderCusCode,
        value.p_ords_receiverCusCode,
        value.p_ords_lstWriter
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
       });
   
     } catch (error) {
       res.send("500", {
         error: '파라미터 값이 올바르지 않습니다.'
       });
     }
  
  });


  router.put('/detail', function(req,res){
 try {
      var sql = "call ecolo9ger.sp_order_sub_udt(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
       var value = JSON.parse(req.body.pData);
       value = [
        value.p_ords_code,
        value.p_pro_code,
        value.p_ords_unitAdjPrice,
        value.p_ords_count,      
        value.p_ords_ToAmount,
        value.p_ords_senderName,
        value.p_ords_senderPhone1, 
        value.p_ords_senderPhone2,
        value.p_ords_senderZipcode,
        value.p_ords_senderAddress,
        value.p_ords_senderAddressDetail,
        value.p_ords_receiverName,
        value.p_ords_receiverPhone1,
        value.p_ords_receiverPhone2,
        value.p_ords_receiverZipcode,
        value.p_ords_receiverAddress,
        value.p_ords_receiverAddressDetail,
        value.p_ords_deliPosition,
        value.p_ords_deliMemo,
        value.p_ords_reqDate, 
        null,
        value.p_cus_code
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
   
       }) 
   
     } catch (error) {
       res.send("500", {
         error: '파라미터 값이 올바르지 않습니다.'
       });
     }
  });

  router.get('/detail/:code', function(req, res){


    var sql = "call ecolo9ger.sp_order_sub_FindGroup(?);";
    var value = [req.params.code];
  
    db.dbProcSelect(sql, value, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("database error");
      } else {
        res.send(result[0]);
      }
    });
  });

  router.get('/orderproducts/:code', function(req, res){
    var sql = "call ecolo9ger.sp_order_products(?);";
    var value = [req.params.code];
  
    db.dbProcSelect(sql, value, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("database error");
      } else {
        res.send(result[0]);
      }
    });
  });

  router.get('/customer/:code', function(req, res){
    var sql = "call ecolo9ger.sp_orders_customers(?);";
    var value = [req.params.code];
  
    db.dbProcSelect(sql, value, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("database error");
      } else {
        res.send(result[0]);
      }
    });
  });

  router.get('/', function(req, res){
    
    var sql = "call ecolo9ger.sp_orders_sel(?, ?, ?, ?, ?);";
    var value = [         
    req.query.p_ord_code == null ? '':  req.query.p_ord_code, 
    req.query.p_cus_name == null ? '':  req.query.p_cus_name, 
    req.query.p_ord_dateForm == '' ? null:  req.query.p_ord_dateForm,
    req.query.p_ord_dateTo == '' ? null:  req.query.p_ord_dateTo,
    req.query.p_ord_state = null ? '': req.query.p_ord_state
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

module.exports = router;