const express = require('express');
const query = require('../db');
const router = express.Router();
router.get('/', async function(req, res, next) {
  var sql = `SELECT * FROM Characters`;
  const rows = await query(sql);
  res.render('character', {
    factions: await query(`select * from Factions`),
    religions: await query(`select * from Religions`),
    races: await query(`select * from Races`),
    kingdoms: await query(`select * from Kingdoms`),
    list: {
      data: rows
    }
  });
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `SELECT * FROM Characters WHERE Character_id = ${id}`;
  const rows = await query(sql);
  res.json(rows[0]);
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `DELETE FROM Characters WHERE Character_id = ${id}`;
  await query(sql);
  res.json({});
});

router.post('/', async function(req, res, next) {
  const factionId = req.body.factionId;
  const religionId = req.body.religionId;
  const raceId = req.body.raceId;
  const kingdomId = req.body.kingdomId;
  const gender = req.body.gender;
  const height = req.body.height;
  const weight = req.body.weight;
  const id = req.body.id;
  let sql = `INSERT INTO Characters (Faction_id, Religion_id, Race_id, Kingdom_id, gender, height, weight) VALUES (${factionId}, ${religionId}, ${raceId}, ${kingdomId}, ${gender}, ${height}, ${weight})`;
  if (id) {
    sql  = `UPDATE Characters SET Faction_id = ${factionId}, Religion_id = ${religionId}, Race_id = ${raceId}, Kingdom_id = ${kingdomId}, gender = ${gender}, height = ${height}, weight = ${weight}  WHERE Character_id = ${id}`;
  }
  await query(sql);
  res.json(rows);
});
module.exports = router;
