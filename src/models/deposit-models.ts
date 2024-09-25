import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Profile } from "./profile-models";


export interface DepositAttributes {
  id: number;
  clientId: number;
  operationDate: Date;
  depositValue: number;
}

export interface DepositCreationAttributes extends Optional<DepositAttributes, "id"> {}

export class Deposit extends Model<DepositAttributes, DepositCreationAttributes> implements DepositAttributes {
  public id!: number;
  public clientId!: number;
  public operationDate!: Date;
  public depositValue!: number;
}

export function initializeDeposit(sequelize: Sequelize) {
  Deposit.init(
    {
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
    },
    {
      sequelize,
      modelName: "Deposit",
      tableName: "deposit",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
