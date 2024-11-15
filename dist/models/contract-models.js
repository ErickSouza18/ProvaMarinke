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
                model: 'profile', // Atualizado para refletir o nome correto da tabela
                key: 'id'
            }
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jobs', // Atualizado para refletir o nome correto da tabela
                key: 'id'
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
    });
}
export default Contract;
