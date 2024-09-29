import Contratante from "../models/contratante-models";


export class ContratanteRepository {
    public async create(data: ContratanteCreationAttributes): Promise<Contratante> {
        try {
            const contratante = await Contratante.create(data);
            return contratante;
        } catch (error) {
            throw new Error(`Unable to create contratante: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Contratante[]> {
        try {
            return await Contratante.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch contratantes: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Contratante | null> {
        try {
            return await Contratante.findById(id);
        } catch (error) {
            throw new Error(`Unable to find contratantes with ID ${id}: ${(error as Error).message}`);
        }
    }
}