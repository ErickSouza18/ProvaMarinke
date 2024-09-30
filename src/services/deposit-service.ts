import { Deposit, DepositCreationAttributes } from "../models/deposit-models.js";
import { DepositRepository } from "../repositories/deposit-repository.js";

export class DepositService {
    private depositRepository: DepositRepository;

    constructor() {
        this.depositRepository = new DepositRepository();
    }

    public async createDeposit(clientId: number, operationDate: Date, depositValue: number): Promise<Deposit> {
        try {
            return await this.depositRepository.create({ clientId, operationDate, depositValue });
        } catch (error) {
            throw new Error(`Impossível criar depósito: ${(error as Error).message}`);
        }
    }
    

    public async getAllDeposits(): Promise<Deposit[]> {
        try {
            return await this.depositRepository.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar depósitos: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Deposit | null> {
        try {
            return await this.depositRepository.findById(id);
        } catch (error) {
            throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<DepositCreationAttributes>): Promise<Deposit | null> {
        try {
            return await this.depositRepository.update(id, data);
        } catch (error) {
            throw new Error(`Impossível atualizar depósito: ${(error as Error).message}`);
        }
    }

    public async deleteDeposit(id: number): Promise<void> {
        try {
            await this.depositRepository.delete(id);
        } catch (error) {
            throw new Error(`Impossível excluir depósito com ID ${id}: ${(error as Error).message}`);
        }
    }
}
