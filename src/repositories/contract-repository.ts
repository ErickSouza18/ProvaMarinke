import { Contract, ContractCreationAttributes } from "../models/contract-models.js";

export class ContractRepository {

    // Criar contrato
    public async create(data: ContractCreationAttributes): Promise<Contract> {
        try {
            const contract = await Contract.create(data);
            return contract;
        } catch (error) {
            throw new Error(`Impossível criar contrato: ${(error as Error).message}`);
        }
    }

    // Encontrar todos os contratos
    public async findAll(): Promise<Contract[]> {
        try {
            return await Contract.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar contratos: ${(error as Error).message}`);
        }
    }

    // Encontrar contrato por ID
    public async findById(id: number): Promise<Contract | null> {
        try {
            return await Contract.findByPk(id);
        } catch (error) {
            throw new Error(`Impossível encontrar contrato pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    // Atualizar contrato por ID
    public async update(id: number, data: Partial<ContractCreationAttributes>): Promise<Contract | null> {
        try {
            const contract = await Contract.findByPk(id);
            if (!contract) {
                throw new Error(`Contrato com ID ${id} não encontrado`);
            }
            await contract.update(data);
            return contract;
        } catch (error) {
            throw new Error(`Impossível atualizar contrato com ID ${id}: ${(error as Error).message}`);
        }
    }

    // Excluir contrato por ID
    public async delete(id: number): Promise<void> {
        try {
            const result = await Contract.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Contrato com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir contrato com ID ${id}: ${(error as Error).message}`);
        }
    }
}
