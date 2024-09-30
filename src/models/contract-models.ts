import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface ContractAttributes {
    id: number;
    profileId: number;
    jobId: number; 
    description: string;
    createdAt?: Date; 
    updatedAt?: Date;
}

export interface ContractCreationAttributes extends Optional<ContractAttributes, "id"> { }

export class Contract extends Model<ContractAttributes, ContractCreationAttributes> implements ContractAttributes {
    public id!: number;
    public profileId!: number; 
    public jobId!: number; 
    public description!: string;

}

export function initializeContract(sequelize: Sequelize) {
    Contract.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            profileId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'PROFILE', // Atualizado para refletir o nome correto da tabela
                    key: 'ID'
                }
            },
            jobId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'JOB', // Atualizado para refletir o nome correto da tabela
                    key: 'ID'
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Contract",
            tableName: "contract", // Atualizado para refletir o nome correto da tabela
            timestamps: false, 
            freezeTableName: true,
        }
    );
}

export default Contract;
