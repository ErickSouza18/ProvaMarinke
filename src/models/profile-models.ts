import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface ProfileAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: string;
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profession!: string;
  public balance!: number;
  public type!: string;
}

export function initializeProfile(sequelize: Sequelize) {
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profile",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
