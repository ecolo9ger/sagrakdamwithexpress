var express = require('express');
var router = express.Router();
var db = require('../common/database');

router.get('/:code', function (req, res) {
    var sql = "call sp_codes_sub_findAll(?);";
    var value = [req.params.code];
  
    db.dbProcSelect(sql, value, function (err, result) {
      if (err) {
        res.status(500).send("database error");
      } else {
        res.send(result[0]);
      }
    });
  });
  
  
  module.exports = router;