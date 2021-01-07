import mysql from 'mysql';

let pool = mysql.createPool({
    connectionLimit: 15,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                resolve(connection)
            }
        });
    });
};

const executeQuery = (sql) => {
    return getConnection()
    .then((connection) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        });
    });
};

const generatePlaceholders = (args = []) => {
    let placeholders = '';
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (i === args.length - 1) { 
                placeholders += `${args[i]}`;
            } else {
                placeholders += `${args[i]}, `;
            }
        }
    }
    return placeholders;
};

const callProcedure = (procedureName, args = []) => {
    let placeholders = generatePlaceholders(args);
    let callString = `CALL ${procedureName}(${placeholders});`; 
    return executeQuery(callString, args)
        .then((results) => results[0]);
};

export { executeQuery, callProcedure };