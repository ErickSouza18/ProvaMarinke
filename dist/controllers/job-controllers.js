var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JobService } from "../services/job-service.js";
export class JobController {
    constructor() {
        this.jobService = new JobService();
    }
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield this.jobService.createJob(req.body);
                return res.status(201).json(job);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao criar Job", error: error.message });
            }
        });
    }
    getAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield this.jobService.getAllJobs();
                return res.status(200).json(jobs);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao buscar Jobs", error: error.message });
            }
        });
    }
    getJobById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const job = yield this.jobService.getJobById(Number(id));
                if (!job)
                    return res.status(404).json({ message: "Job não encontrado" });
                return res.status(200).json(job);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao buscar Job", error: error.message });
            }
        });
    }
    updateJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const job = yield this.jobService.updateJob(Number(id), req.body);
                if (!job)
                    return res.status(404).json({ message: "Job não encontrado" });
                return res.status(200).json(job);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao atualizar Job", error: error.message });
            }
        });
    }
    deleteJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.jobService.deleteJob(Number(id));
                return res.status(200).json({ message: "Job excluído com sucesso" });
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao excluir Job", error: error.message });
            }
        });
    }
    getJobsByContractId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { contractId } = req.params; // Supondo que o ID do contrato é passado como parâmetro
            try {
                const jobs = yield this.jobService.getJobsByContractId(Number(contractId));
                if (jobs.length === 0) {
                    return res.status(404).json({ message: `Nenhum job encontrado para o contrato com ID ${contractId}.` });
                }
                return res.status(200).json(jobs);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao buscar jobs do contrato", error });
            }
        });
    }
}
