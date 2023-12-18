const sql = require('mssql')
async function get_info(doc) { // doc → Nit
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=192.168.0.14,1433;Database=APLINSA;User Id=Administrador;Password=3TaM$M3gA+0;Encrypt=true')
        const result = await sql.query`select * from mytable where id = ${value}`
        console.dir(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = get_info