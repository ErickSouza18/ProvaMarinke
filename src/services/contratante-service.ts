import { Contratante, ContratanteCreationAttributes } from "../models/contratante-models.js";


export class ContratanteService {

    public async createContratante(nomeCompleto: string, email: string, telefone: string): Promise<Contratante> {
        try {
            const contratante = await Contratante.create({ nomeCompleto, email, telefone });
            return contratante
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossivel criar Contratente: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu");
            }
        }
    }


    public async getAllContratantes(): Promise<Contratante[]> {
        try {
            return await Contratante.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossivel encontrar contratantes ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu");
            }
        }
    }

    public async deleteContratante(id: number): Promise<void> {
        try {
            const result = await Contratante.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Contratante com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir contratante com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<ContratanteCreationAttributes>): Promise<Contratante | null> {
        try {
            const [numberOfAffectedRows, [updatedContratante]] = await Contratante.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null; // Retorna null se nenhum registro foi atualizado
            }

            return updatedContratante;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar contratante: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contratante.");
            }
        }
    }

    public async findById(id: number): Promise<Contratante | null> {
        try {
            return await Contratante.findByPk(id);
        } catch (error) {
            throw new Error(`Impossível encontrar contratante pelo ID ${id}: ${(error as Error).message}`);
        }
    }



}