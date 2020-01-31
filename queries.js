const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
})
const queries = [
    'SELECT * FROM cd.facilities ORDER by facid ASC',
    'SELECT (name),(membercost) FROM cd.facilities',
    'SELECT * From cd.facilities WHERE membercost>0',
    'select facid, name, membercost, monthlymaintenance from cd.facilities where membercost > 0 and (membercost < monthlymaintenance/50.0)',
    'SELECT * FROM cd.facilities WHERE name LIKE \'%Tennis%\'',
    'SELECT * FROM cd.facilities where facid IN (1,5)',
    'SELECT name ,CASE when (monthlymaintenance >100) then \'expensive\' else \'cheap\' END as cost from cd.facilities',
    'select memid,surname,firstname,joindate from cd.members where joindate >= \'20120901\'',
    'Select distinct surname from cd.members order by surname limit 10',
    'Select surname from cd.members union select name from cd.facilities',
    'select MAX (joindate) from cd.members',
    'select firstname,surname,joindate from cd.members where joindate = (select max(joindate) from cd.members)'
]

const getData = (req, res) => {
    pool.query(queries[0], (err, data) => {
        if (err) throw err
        res.status(200).json(data.rows)
    })
}
const getDataByID = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM cd.facilities WHERE facid = $1', [id], (err, data) => {
        if (err) throw err
        res.status(200).json(data.rows)
    })
}
const postData = (req, res) => {
    const { facid, name, membercost, guestcost, initialoutlay, monthlymaintenance } = req.body
    console.log(monthlymaintenance)
    pool.query('INSERT INTO cd.facilities (facid,name,membercost,guestcost,initialoutlay,monthlymaintenance) VALUES ($1,$2,$3,$4,$5,$6)', [facid, name, membercost, guestcost, initialoutlay, monthlymaintenance], (err, data) => {
        if (err) throw err
        res.status(201).send(`Data added with id ${facid}`)
    })
}
const updateData = (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    pool.query('UPDATE cd.facilities SET name=$1 WHERE facid=$2', [name, id], (err, data) => {
        if (err) throw err
        res.status(200).send(`Data with ID: ${id} updated!`)
    })
}

const deleteData = (req, res) => {
    const facid = parseInt(req.params.id)

    pool.query('DELETE FROM cd.facilities WHERE facid=$1', [facid], (err, data) => {
        res.status(200).send(`Data deleted ID: ${facid}!`)
    })
}

module.exports = { getData, getDataByID, postData, updateData, deleteData }