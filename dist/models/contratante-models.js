import { DataTypes, Model } from "sequelize";
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
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Contratante",
        tableName: "contratante",
        timestamps: false,
        freezeTableName: true,
    });
}
export default Contratante;
