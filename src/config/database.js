const mysql = require('mysql')

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'crudnodreact'
})

connection.connect((err)=>{
    try {
        console.log('berhasil terhubung ke database')
        return
    } catch (err) {
        console.log(err)
    }
})

module.exports = connection