import { Model, DataTypes } from "sequelize";
import { Job } from "./job-models.js";
export class Payment extends Model {
}
export function initializePayment(sequelize) {
    Payment.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Job,
                key: "id",
            },
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentValue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Payment",
        tableName: "payment",
        timestamps: false,
        freezeTableName: true,
    });
}
