import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    database: "bcofio",
    username: "root",
    password: "123456",
    host: "localhost",
    port: 3306,
});

export default sequelize;