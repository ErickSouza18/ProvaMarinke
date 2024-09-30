import { Profile, ProfileCreationAttributes } from "../models/profile-models.js";
import { Deposit } from "../models/deposit-models.js";
import { Payment } from "../models/Payment-models.js";
import { Job } from "../models/job-models.js";

export class ProfileService {

    public async createProfile(firstName: string, lastName: string, profession: string, balance: number, type: string): Promise<Profile> {
        try {
            return await Profile.create({ firstName, lastName, profession, balance, type });
        } catch (error) {
            throw new Error(`Impossível criar perfil: ${(error as Error).message}`);
        }
    }
    
    

    public async getAllProfiles(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar perfis: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Profile | null> {
        try {
            return await Profile.findByPk(id);
        } catch (error) {
            throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    public async updateProfile(id: number, data: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
        try {
            const profile = await Profile.findByPk(id);
            if (!profile) {
                return null;
            }
            await profile.update(data);
            return profile;
        } catch (error) {
            throw new Error(`Impossível atualizar perfil com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async deleteProfile(id: number): Promise<void> {
        try {
            const result = await Profile.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Perfil com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir perfil com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async getBalance(id: number): Promise<number> {
        try {
            const deposits = await Deposit.sum('depositValue', { where: { id } }); 
            const payments = await Payment.sum('paymentValue', { where: { id } }); 
            return (deposits || 0) - (payments || 0); 
        } catch (error) {
            throw new Error(`Erro ao calcular saldo: ${(error as Error).message}`);
        }
    }
    
    

    public async getUnpaidJobsDetails(id: number): Promise<{ jobId: number, description: string, status: string }[]> {
        try {
            const unpaidJobs = await Job.findAll({
                attributes: ['id', 'description'],
                where: {
                    id: id,
                    paid: false 
                }
            });
    
            // Se o campo status não existe, adicionamos uma lógica para definir
            return unpaidJobs.map(job => ({
                jobId: job.id,
                description: job.description,
                status: "pending" // Defina um status aqui
            }));
            
        } catch (error) {
            throw new Error(`Erro ao buscar detalhes dos jobs não pagos: ${(error as Error).message}`);
        }
    }
    
    
    
    
}
