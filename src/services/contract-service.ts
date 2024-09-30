import { Contract, ContractCreationAttributes } from "../models/contract-models.js";
import { ContractRepository } from "../repositories/contract-repository.js";

export class ContractService {
    private contractRepository: ContractRepository;

    constructor() {
        this.contractRepository = new ContractRepository();
    }

    public async createContract(contractData: ContractCreationAttributes): Promise<Contract> {
        try {
            return await this.contractRepository.create(contractData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar contrato: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o contrato.");
            }
        }
    }

    public async getAllContracts(): Promise<Contract[]> {
        try {
            return await this.contractRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar contratos: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar contratos.");
            }
        }
    }

    public async getContractById(id: number): Promise<Contract | null> {
        try {
            return await this.contractRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar contrato pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o contrato.");
            }
        }
    }

    public async updateContract(id: number, updatedData: Partial<ContractCreationAttributes>): Promise<Contract | null> {
        try {
            return await this.contractRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar contrato com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contrato.");
            }
        }
    }

    public async deleteContract(id: number): Promise<void> {
        try {
            await this.contractRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir contrato com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o contrato.");
            }
        }
    }
}
