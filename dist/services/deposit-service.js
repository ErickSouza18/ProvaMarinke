var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DepositRepository } from "../repositories/deposit-repository.js";
export class DepositService {
    constructor() {
        this.depositRepository = new DepositRepository();
    }
    createDeposit(clientId, operationDate, depositValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.create({ clientId, operationDate, depositValue });
            }
            catch (error) {
                throw new Error(`Impossível criar depósito: ${error.message}`);
            }
        });
    }
    getAllDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.findAll();
            }
            catch (error) {
                throw new Error(`Impossível encontrar depósitos: ${error.message}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.findById(id);
            }
            catch (error) {
                throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${error.message}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.update(id, data);
            }
            catch (error) {
                throw new Error(`Impossível atualizar depósito: ${error.message}`);
            }
        });
    }
    deleteDeposit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.depositRepository.delete(id);
            }
            catch (error) {
                throw new Error(`Impossível excluir depósito com ID ${id}: ${error.message}`);
            }
        });
    }
}
