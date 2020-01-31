const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
})

const getData = (req, res) => {
    pool.query('SELECT * FROM data ORDER by ID ASC', (err, data) => {
        if (err) throw err
        res.status(200).json(data.rows)
    })
}
const getDataByID = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM data WHERE id = $1', [id], (err, data) => {
        if (err) throw err
        res.status(200).json(data.rows)
    })
}
const postData = (req, res) => {
    const { name, model } = req.body

    pool.query('INSERT INTO data (name,model) VALUES ($1,$2)', [name, model], (err, data) => {
        if (err) throw err
        res.status(201).send(`Data added with id ${id}`)
    })
}
const updateData = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, model } = req.body

    pool.query('UPDATE data SET name=$1,model=$2 WHERE id=$3', [name, model, id], (err, data) => {
        if (err) throw err
        res.status(200).send(`Data with ID: ${id} updated!`)
    })
}

const deleteData = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM data WHERE id=$1', [id], (err, data) => {
        res.status(200).send(`Data deleted ID: ${id}!`)
    })
}

module.exports = { getData, getDataByID, postData, updateData, deleteData }