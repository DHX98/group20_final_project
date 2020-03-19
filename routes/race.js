const express = require('express');
const query = require('../db');
const router = express.Router();
router.get('/', async function(req, res, next) {
  var sql = `SELECT t1.Race_id as Race_id, t1.Religion_id as Religion_id, t2.Religion_believer as Religion_believer, t1.Race_habit as Race_habit, t1.Race_population as Race_population  FROM Races t1 LEFT JOIN Religions t2 on t1.Religion_id = t2.Religion_id`;
  const rows = await query(sql);
  const religions = await query("select * from Religions");
  res.render('race', {
    religions: religions,
    list: {
      data: rows
    }
  });
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `SELECT * FROM Races WHERE Race_id = ${id}`;
  const rows = await query(sql);
  res.json(rows[0]);
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  var sql = `DELETE FROM Races WHERE Race_id = ${id}`;
  await query(sql);
  res.json({});
});

router.post('/', async function(req, res, next) {
  const religionId = req.body.religionId;
  const raceHabit = req.body.raceHabit;
  const racePopulation = req.body.racePopulation;
  const id = req.body.id;
  let sql = `INSERT INTO Races (Religion_id, Race_habit, Race_population) VALUES (${religionId}, '${raceHabit}', ${racePopulation})`;
  if (id) {
    sql  = `UPDATE Races SET Religion_id = ${religionId}, Race_habit = '${raceHabit}', Race_population = ${racePopulation} WHERE Race_id = ${id}`;
  }
  await query(sql);
  res.json({});
});
module.exports = router;
