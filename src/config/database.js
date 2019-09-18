module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'events',
    define: {
        timestamps: true,
        underscored:  true,
        underscoredAll:  true
    }
}