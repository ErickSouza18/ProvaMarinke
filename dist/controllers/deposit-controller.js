var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DepositService } from "../services/deposit-service.js";
export class DepositController {
    constructor() {
        this.depositService = new DepositService();
    }
    createDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientId, operationDate, depositValue } = req.body;
                if (depositValue < 0) {
                    return res.status(400).json({ message: "Valor de depósito não pode ser negativo." });
                }
                const newDeposit = yield this.depositService.createDeposit(clientId, operationDate, depositValue);
                return res.status(201).json(newDeposit);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao criar depósito", error: error.message });
            }
        });
    }
    getAllDeposits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deposits = yield this.depositService.getAllDeposits();
                if (deposits.length === 0) {
                    return res.status(404).json({ message: "Nenhum depósito encontrado." });
                }
                return res.status(200).json(deposits);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao encontrar depósitos", error });
            }
        });
    }
    getDepositById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deposit = yield this.depositService.findById(Number(id));
                if (!deposit) {
                    return res.status(404).json({ message: `Depósito com ID ${id} não encontrado.` });
                }
                return res.status(200).json(deposit);
            }
            catch (error) {
                return res.status(500).json({ message: `Erro ao buscar depósito por ID`, error });
            }
        });
    }
    deleteDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.depositService.deleteDeposit(Number(id));
                return res.status(200).json({ message: `Depósito com ID ${id} foi excluído com sucesso.` });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao excluir depósito", error });
            }
        });
    }
    updateDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { clientId, operationDate, depositValue } = req.body;
                const updatedDeposit = yield this.depositService.update(Number(id), { clientId, operationDate, depositValue });
                if (!updatedDeposit) {
                    return res.status(404).json({ message: "Depósito não encontrado" });
                }
                return res.status(200).json({
                    message: `Depósito com ID ${id} foi atualizado com sucesso`,
                    deposit: updatedDeposit
                });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao atualizar depósito", error });
            }
        });
    }
}
