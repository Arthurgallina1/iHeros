module.exports = {
    development: {
        client: "pg",
        connection: {
            user: "postgres",
            password: "postgres",
            database: "ihero",
        },
        migrations: {
            // tableName: 'knex_migrations',
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
