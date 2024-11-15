import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  operationDate: Date;
  paymentDate: Date | null;
  price: number;
  paid: boolean;
  profileId: number;
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> { }

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public paymentDate!: Date | null;
  public price!: number;
  public paid!: boolean;
  public profileId!: number;
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
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Job",
      tableName: "jobs",
      timestamps: false,
    }
  );
}
