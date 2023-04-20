"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var kysely_1 = require("kysely");
var db = new kysely_1.Kysely({
    dialect: new kysely_1.PostgresDialect({
        pool: new pg_1.Pool({
            host: 'localhost',
            database: 'kysely_test'
        })
    })
});
