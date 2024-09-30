var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Deposit } from "../models/deposit-models.js";
export class DepositRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Deposit.create(data);
            }
            catch (error) {
                throw new Error(`Impossível criar depósito: ${error.message}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Deposit.findAll();
            }
            catch (error) {
                throw new Error(`Impossível encontrar depósitos: ${error.message}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Deposit.findByPk(id);
            }
            catch (error) {
                throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${error.message}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deposit = yield Deposit.findByPk(id);
                if (!deposit) {
                    throw new Error(`Depósito com ID ${id} não encontrado`);
                }
                yield deposit.update(data);
                return deposit;
            }
            catch (error) {
                throw new Error(`Impossível atualizar depósito com ID ${id}: ${error.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Deposit.destroy({ where: { id } });
                if (result === 0) {
                    throw new Error(`Depósito com ID ${id} não encontrado`);
                }
            }
            catch (error) {
                throw new Error(`Impossível excluir depósito com ID ${id}: ${error.message}`);
            }
        });
    }
}
