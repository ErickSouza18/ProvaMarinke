import { Deposit, DepositCreationAttributes } from "../models/deposit-models.js";

export class DepositRepository {
    public async create(data: DepositCreationAttributes): Promise<Deposit> {
        try {
            return await Deposit.create(data);
        } catch (error) {
            throw new Error(`Impossível criar depósito: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Deposit[]> {
        try {
            return await Deposit.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar depósitos: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Deposit | null> {
        try {
            return await Deposit.findByPk(id);
        } catch (error) {
            throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<DepositCreationAttributes>): Promise<Deposit | null> {
        try {
            const deposit = await Deposit.findByPk(id);
            if (!deposit) {
                throw new Error(`Depósito com ID ${id} não encontrado`);
            }
            await deposit.update(data);
            return deposit;
        } catch (error) {
            throw new Error(`Impossível atualizar depósito com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const result = await Deposit.destroy({ where: { id } });
            if (result === 0) {
                throw new Error(`Depósito com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir depósito com ID ${id}: ${(error as Error).message}`);
        }
    }
}
