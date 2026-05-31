module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "root",
    DB: "physics_tests",
    PORT: 5433,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};