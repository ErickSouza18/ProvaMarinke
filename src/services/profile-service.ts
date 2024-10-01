import { Profile, ProfileCreationAttributes } from "../models/profile-models.js";
import { Deposit } from "../models/deposit-models.js";
import { Payment } from "../models/Payment-models.js";
import { Job } from "../models/job-models.js";
import { ProfileRepository } from "../repositories/profile-repository.js";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository(); // Inicializa o repositório
    }

    public async createProfile(firstName: string, lastName: string, profession: string, balance: number, type: string): Promise<Profile> {
        try {
            const profileData: ProfileCreationAttributes = { firstName, lastName, profession, balance, type };
            return await this.profileRepository.create(profileData); // Usa o repositório para criar
        } catch (error) {
            throw new Error(`Impossível criar perfil: ${(error as Error).message}`);
        }
    }

    public async getAllProfiles(): Promise<Profile[]> {
        return await this.profileRepository.findAll(); // Usa o repositório
    }

    public async findById(id: number): Promise<Profile | null> {
        try {
            const profile = await this.profileRepository.findById(id);
            if (profile) {
                // Garanta que o balance seja um número ou no formato desejado
                profile.balance = Number(profile.balance); // Isso garante que seja um número
            }
            return profile;
        } catch (error) {
            throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${(error as Error).message}`);
        }
    }
    

    public async updateProfile(id: number, data: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
        return await this.profileRepository.update(id, data); // Usa o repositório
    }

    public async deleteProfile(id: number): Promise<void> {
        return await this.profileRepository.delete(id); // Usa o repositório
    }

     
    
    
    public async getUnpaidJobsDetails(profileId: number): Promise<{ jobId: number, description: string, status: string }[]> {
        try {
            const unpaidJobs = await Job.findAll({
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
        } catch (error) {
            throw new Error(`Erro ao buscar detalhes dos jobs não pagos: ${(error as Error).message}`);
        }
    }

    public async updateBalance(clientId: number, amount: number): Promise<Profile | null> {
        try {
            const profile = await this.profileRepository.findById(clientId);
            if (!profile) {
                throw new Error(`Profile com ID ${clientId} não encontrado`);
            }
    
            // Atualize o saldo (garantindo que os valores sejam tratados como números)
            profile.balance = Number(profile.balance) + amount; // Somar corretamente
            await profile.save(); // Salva as alterações no banco de dados
            return profile;
        } catch (error) {
            throw new Error(`Impossível atualizar saldo do Profile: ${(error as Error).message}`);
        }
    }

    public async getBalance(profileId: number): Promise<number> {
        try {
            const totalPayments = await Payment.sum('paymentValue', {
                where: { clientId: profileId },
            }) || 0;
    
            const totalDeposits = await Deposit.sum('depositValue', {
                where: { clientId: profileId },
            }) || 0;
    
            // Calcule o saldo corretamente, convertendo para o formato em reais
            return (totalDeposits - totalPayments) / 100; // Certifique-se de que isso está correto
        } catch (error) {
            throw new Error(`Erro ao calcular saldo: ${(error as Error).message}`);
        }
    }
    
    
}
