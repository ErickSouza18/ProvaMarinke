import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Job } from "./job-models.js";


export interface PaymentAttributes {
  id: number;
  jobId: number;
  operationDate: Date;
  paymentValue: number;
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public jobId!: number;
  public operationDate!: Date;
  public paymentValue!: number;
}

export function initializePayment(sequelize: Sequelize) {
  Payment.init(
    {
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
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payment",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
