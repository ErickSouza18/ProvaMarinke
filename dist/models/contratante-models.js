import { Model, DataTypes } from "sequelize";
export class Contratante extends Model {
}
export function initializeContratante(sequelize) {
    Contratante.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomeCompleto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Contratante",
        tableName: "contratantes",
        timestamps: true,
        freezeTableName: true,
    });
}
export default Contratante;
