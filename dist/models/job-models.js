import { Model, DataTypes } from "sequelize";
import { Contract } from "./contract-models";
export class Job extends Model {
}
export function initializeJob(sequelize) {
    Job.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contractId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Contract,
                key: "id",
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Job",
        tableName: "job",
        timestamps: false,
        freezeTableName: true,
    });
}
