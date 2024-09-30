import { Model, DataTypes } from "sequelize";
export class Contract extends Model {
}
export function initializeContract(sequelize) {
    Contract.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'PROFILE', // Atualizado para refletir o nome correto da tabela
                key: 'ID'
            }
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'JOB', // Atualizado para refletir o nome correto da tabela
                key: 'ID'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Contract",
        tableName: "contract", // Atualizado para refletir o nome correto da tabela
        timestamps: false,
        freezeTableName: true,
    });
}
export default Contract;
