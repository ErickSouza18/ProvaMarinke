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
import { Payment } from "../models/Payment-models.js";
import { Job } from "../models/job-models.js";
import { ProfileRepository } from "../repositories/profile-repository.js";
export class ProfileService {
    constructor() {
        this.profileRepository = new ProfileRepository(); // Inicializa o repositório
    }
    createProfile(firstName, lastName, profession, balance, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileData = { firstName, lastName, profession, balance, type };
                return yield this.profileRepository.create(profileData); // Usa o repositório para criar
            }
            catch (error) {
                throw new Error(`Impossível criar perfil: ${error.message}`);
            }
        });
    }
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileRepository.findAll(); // Usa o repositório
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.findById(id);
                if (profile) {
                    // Garanta que o balance seja um número ou no formato desejado
                    profile.balance = Number(profile.balance); // Isso garante que seja um número
                }
                return profile;
            }
            catch (error) {
                throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${error.message}`);
            }
        });
    }
    updateProfile(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileRepository.update(id, data); // Usa o repositório
        });
    }
    deleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileRepository.delete(id); // Usa o repositório
        });
    }
    getUnpaidJobsDetails(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unpaidJobs = yield Job.findAll({
                    attributes: ['id', 'description'],
                    where: {
                        profileId: profileId,
                        paid: false
                    }
                });
                return unpaidJobs.map(job => ({
                    jobId: job.id,
                    description: job.description,
                    status: "pending" // Defina um status aqui
                }));
            }
            catch (error) {
                throw new Error(`Erro ao buscar detalhes dos jobs não pagos: ${error.message}`);
            }
        });
    }
    updateBalance(clientId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.findById(clientId);
                if (!profile) {
                    throw new Error(`Profile com ID ${clientId} não encontrado`);
                }
                // Atualize o saldo (garantindo que os valores sejam tratados como números)
                profile.balance = Number(profile.balance) + amount; // Somar corretamente
                yield profile.save(); // Salva as alterações no banco de dados
                return profile;
            }
            catch (error) {
                throw new Error(`Impossível atualizar saldo do Profile: ${error.message}`);
            }
        });
    }
    getBalance(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPayments = (yield Payment.sum('paymentValue', {
                    where: { clientId: profileId },
                })) || 0;
                const totalDeposits = (yield Deposit.sum('depositValue', {
                    where: { clientId: profileId },
                })) || 0;
                // Calcule o saldo corretamente, convertendo para o formato em reais
                return (totalDeposits - totalPayments) / 100; // Certifique-se de que isso está correto
            }
            catch (error) {
                throw new Error(`Erro ao calcular saldo: ${error.message}`);
            }
        });
    }
}
