var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Job } from "../models/job-models.js";
export class JobService {
    createJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield Job.create(data);
                return job;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar Job: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao criar o Job.");
                }
            }
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar jobs: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao buscar os jobs.");
                }
            }
        });
    }
    getJobById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield Job.findByPk(id);
                if (!job) {
                    throw new Error(`Job com ID ${id} não encontrado`);
                }
                return job;
            }
            catch (error) {
                throw new Error(`Impossível encontrar job pelo ID ${id}: ${error.message}`);
            }
        });
    }
    updateJob(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [numberOfAffectedRows, [updatedJob]] = yield Job.update(data, {
                    where: { id },
                    returning: true,
                });
                if (numberOfAffectedRows === 0) {
                    return null;
                }
                return updatedJob;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar job: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o job.");
                }
            }
        });
    }
    deleteJob(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Job.destroy({
                    where: { id },
                });
                if (result === 0) {
                    throw new Error(`Job com ID ${id} não encontrado`);
                }
            }
            catch (error) {
                throw new Error(`Impossível excluir job com ID ${id}: ${error.message}`);
            }
        });
    }
    getJobsByContractId(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job.findAll({
                    where: { contractId }
                });
            }
            catch (error) {
                throw new Error(`Impossível encontrar jobs para o contrato com ID ${contractId}: ${error.message}`);
            }
        });
    }
}
