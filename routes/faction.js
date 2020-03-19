const express = require('express');
const query = require('../db');
const router = express.Router();
router.get('/', async function(req, res, next) {
  const rows = await query('SELECT * FROM Factions');
  res.render('faction', {
    list: {
      data: rows
    }
  });
});
router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `SELECT * FROM Factions WHERE Faction_id = ${id}`;
  const rows = await query(sql);
  res.json(rows[0]);
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `DELETE FROM Factions WHERE Faction_id = ${id}`;
  await query(sql);
  res.json({});
});

router.post('/', async function(req, res, next) {
  const factionName = req.body.factionName;
  const id = req.body.id;
  let sql = `INSERT INTO Factions (Faction_name) VALUES ('${factionName}')`;
  if (id) {
    sql  = `UPDATE Factions SET Faction_name = '${factionName}' WHERE Faction_id = ${id}`;
  }
  await query(sql);
  res.json({});
});
module.exports = router;
