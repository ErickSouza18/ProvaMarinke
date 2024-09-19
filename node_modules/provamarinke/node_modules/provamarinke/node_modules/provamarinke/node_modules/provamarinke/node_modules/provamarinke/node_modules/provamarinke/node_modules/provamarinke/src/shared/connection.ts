import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    database: "",
    username: "root",
    password: "",
    host: "localhost",
    port: 3306,
});

export default sequelize;