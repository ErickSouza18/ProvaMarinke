import { DataTypes, Model, STRING, Sequelize, Optional } from "sequelize";

export interface ContratanteAttributes {
    id: number;
    nomeCompleto: string;
    email: string;
    telefone: string;
    createdAt?: Date;
    updateAt?: Date;
}

export interface ContratanteCreationAttributes extends Optional<ContratanteAttributes, "id"> { }

export class Contratante extends Model<ContratanteAttributes, ContratanteCreationAttributes> implements ContratanteAttributes {
    public id!: number;
    public nomeCompleto!: string;
    public email!: string;
    public telefone!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


//export class Contratante extends Model<ContratanteAttibutes, ContratanteCreationAttributes>


export function initializeContratante(sequelize: Sequelize) {
    Contratante.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nomeCompleto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },

        {
            sequelize,
            modelName: "Contratante",
            tableName: "contratante",
            timestamps: false,
            //freezTableName: true,
        }
    );
}

export default Contratante;