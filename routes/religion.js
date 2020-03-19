const express = require('express');
const query = require('../db');
const router = express.Router();
router.get('/', async function(req, res, next) {
  var sql = `SELECT * FROM Religions`;
  const rows = await query(sql);
  res.render('religion', {
    list: {
      data: rows
    }
  })
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `SELECT * FROM Religions WHERE Religion_id = ${id}`;
  const rows = await query(sql);
  res.json(rows[0]);
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `DELETE FROM Religions WHERE Religion_id = ${id}`;
  await query(sql);
  res.json({});
});

router.post('/', async function(req, res, next) {
  const religionName = req.body.religionName;
  const religionBeliever = req.body.religionBeliever;
  const religionGod = req.body.religionGod;
  const religionBuff = req.body.religionBuff;
  const id = req.body.id;
  let sql = `INSERT INTO Religions (Religion_name, Religion_believer, Religion_god, Religion_buff) VALUES ('${religionName}', ${religionBeliever}, '${religionGod}', '${religionBuff}')`;
  if (id) {
    sql  = `UPDATE Religions SET Religion_name = '${religionName}', Religion_believer = ${religionBeliever}, Religion_god = '${religionGod}', Religion_buff = '${religionBuff}'  WHERE Religion_id = ${id}`;
  }
  await query(sql);
  res.json({});
});
module.exports = router;
