import { Model, DataTypes } from "sequelize";
// Definição da classe do modelo
export class Contratante extends Model {
}
// Exporta a função para inicializar o modelo
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
            unique: true, // Adicionei unique
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
        timestamps: true, // Habilita timestamps
        freezeTableName: true,
    });
}
export default Contratante;
