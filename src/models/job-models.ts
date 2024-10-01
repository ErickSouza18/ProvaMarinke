import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Contract } from "./contract-models.js";
import { Payment } from "./Payment-models.js";

export interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  operationDate: Date;
  paymentDate: Date | null;
  price: number;
  paid: boolean;
  profileId: number; // Certifique-se de que este campo exista

}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public paymentDate!: Date | null;
  public price!: number;
  public paid!: boolean;
  public profileId!: number; // Certifique-se de que este campo exista

}

export function initializeJob(sequelize: Sequelize) {
  Job.init(
    {
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
      profileId: { // Adicione aqui
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },
    {
      sequelize,
      modelName: "Job",
      tableName: "job",
      timestamps: false,
      freezeTableName: true,
    }
  );

}
