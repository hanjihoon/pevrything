import mysql from "mysql2/promise"

export async function query({query, values  = []}) {
    const dbConnection = await mysql.createConnection({
        user : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB
    })

    try {
        const [results] = await dbConnection.execute(query, values, function(err, row, field) {
            if(err) {
                console.log(err);
                res.json({'status':'ERROR'});
            } else {
                res.json({'status':'OK'});
            }
        });
        
        (await dbConnection).end();
        return results
    } catch (error) {
        throw Error(error.message);
    }
}