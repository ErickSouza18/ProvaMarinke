import { Model, DataTypes } from "sequelize";
import { Profile } from "./profile-models";
export class Contract extends Model {
}
export function initializeContract(sequelize) {
    Contract.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        terms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Profile,
                key: "id",
            },
        },
        contractorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Profile,
                key: "id",
            },
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Contract",
        tableName: "contract",
        timestamps: false,
        freezeTableName: true,
    });
}
