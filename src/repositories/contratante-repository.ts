import { Contratante, ContratanteCreationAttributes } from "../models/contratante-models";

export class ContratanteRepository {

    //criar contratante
    public async create(data: ContratanteCreationAttributes): Promise<Contratante> {
        try {
            const contratante = await Contratante.create(data);
            return contratante;
        } catch (error) {
            throw new Error(`Impossivel criar contratante: ${(error as Error).message}`)
        }
    }

    //encontrar todos contratantes
    public async findAll(): Promise<Contratante[]> {
        try {
            return await Contratante.findAll();
        } catch (error) {
            throw new Error(`Impossivel incontrar contratantes: ${(error as Error).message}`)
        }
    }

    //encontrar contratante por id 
    public async findById(id: number): Promise<Contratante | null> {
        try {
            return await Contratante.findByPk(id);
        } catch (error) {
            throw new Error(`Impossivel de encontrar contratante pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    // Atualizar contratante por ID
    public async update(id: number, data: Partial<ContratanteCreationAttributes>): Promise<Contratante | null> {
        try {
            const contratante = await Contratante.findByPk(id);
            if (!contratante) {
                throw new Error(`Contratante com ID ${id} não encontrado`);
            }
            await contratante.update(data);
            return contratante;
        } catch (error) {
            throw new Error(`Impossível atualizar contratante com ID ${id}: ${(error as Error).message}`);
        }
    }

    // Excluir contratante por ID
    public async delete(id: number): Promise<void> {
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
}