import { Model, DataTypes } from "sequelize";
import { Profile } from "./profile-models";
export class Deposit extends Model {
}
export function initializeDeposit(sequelize) {
    Deposit.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientId: {
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
        depositValue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Deposit",
        tableName: "deposit",
        timestamps: false,
        freezeTableName: true,
    });
}
