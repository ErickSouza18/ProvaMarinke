var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContractService } from "../services/contract-service.js";
export class ContractController {
    constructor() {
        this.contractService = new ContractService();
    }
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContract = yield this.contractService.createContract(req.body);
                res.status(201).json(newContract);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create contract", error: error.message });
            }
        });
    }
    getAllContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield this.contractService.getAllContracts();
                res.status(200).json(contracts);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve contracts", error: error.message });
            }
        });
    }
    getContractById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = yield this.contractService.getContractById(Number(req.params.id));
                if (contract) {
                    res.status(200).json(contract);
                }
                else {
                    res.status(404).json({ message: "Contract not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve contract", error: error.message });
            }
        });
    }
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContract = yield this.contractService.updateContract(Number(req.params.id), req.body);
                if (updatedContract) {
                    res.status(200).json(updatedContract);
                }
                else {
                    res.status(404).json({ message: "Contract not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to update contract", error: error.message });
            }
        });
    }
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.contractService.deleteContract(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete contract", error: error.message });
            }
        });
    }
}
