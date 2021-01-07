import { executeQuery, generatePlaceholders } from '../config/database';

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

    insert(row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let placeholderString = generatePlaceholders(values);
        let sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${placeholderString});`;
        return executeQuery(sql, values)
        .then((results) => {
            return {
                id: results.insertId
            };
        });
    }

    update(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return `${columnName} = ?`;
        });
        let sql = `UPDATE ${this.tableName} SET ${updates.join(',')} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }

    delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return executeQuery(sql);
    }
}

export default Table;