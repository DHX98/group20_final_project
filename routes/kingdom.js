const express = require('express');
const query = require('../db');
const router = express.Router();
router.get('/', async function(req, res, next) {
  var sql = `SELECT * FROM Kingdoms`;
  const rows = await query(sql);
  res.render('kingdom', {
    list: {
      data: rows
    }
  });
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `SELECT * FROM Kingdoms WHERE Kingdom_id = ${id}`;
  const rows = await query(sql);
  res.json(rows[0]);
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `DELETE FROM Kingdoms WHERE Kingdom_id = ${id}`;
  await query(sql);
  res.json({});
});

router.post('/', async function(req, res, next) {
  const kingdomLocationName = req.body.kingdomLocationName;
  const kingdomLocationX = req.body.kingdomLocationX;
  const kingdomLocationY = req.body.kingdomLocationY;
  const id = req.body.id;
  let sql = `INSERT INTO Kingdoms (Kingdom_location_name, Kingdom_location_x, Kingdom_location_y) VALUES ('${kingdomLocationName}', ${kingdomLocationX}, '${kingdomLocationY}')`;
  if (id) {
    sql  = `UPDATE Kingdoms SET Kingdom_location_name = '${kingdomLocationName}', Kingdom_location_x = ${kingdomLocationX}, Kingdom_location_y = '${kingdomLocationY}' WHERE Kingdom_id = ${id}`;
  }
  await query(sql);
  res.json({});
});
module.exports = router;
