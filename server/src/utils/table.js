import { executeQuery } from '../config/database';

class Table {
    constructor(tableName) {
        if(!tableName) {
            throw new TypeError('You must pass a valid table name from the database.')
        }
        this.tableName = tableName
    }

    getAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    getOne(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id};`
        return executeQuery(sql, [id])
            .then((results) => results[0]);
    }
}

export default Table;