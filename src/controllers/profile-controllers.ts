import { Request, Response } from "express";
import { ProfileService } from "../services/profile-service.js";

export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async createProfile(req: Request, res: Response): Promise<Response> {
        try {
            const { firstName, lastName, profession, balance, type } = req.body; // Mantenha as chaves corretas
            const newProfile = await this.profileService.createProfile(firstName, lastName, profession, balance, type);
    
            return res.status(201).json(newProfile);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar perfil", error: (error as Error).message });
        }
    }
    
    

    public async getAllProfiles(req: Request, res: Response): Promise<Response> {
        try {
            const profiles = await this.profileService.getAllProfiles();

            if (profiles.length === 0) {
                return res.status(404).json({ message: "Nenhum perfil encontrado." });
            }

            return res.status(200).json(profiles);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao encontrar os perfis", error });
        }
    }

    public async getProfileById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const profile = await this.profileService.findById(Number(id));

            if (!profile) {
                return res.status(404).json({ message: `Perfil com ID ${id} não encontrado.` });
            }

            return res.status(200).json(profile);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar perfil por ID`, error });
        }
    }

    public async updateProfile(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { firstName, lastName, profession, balance, type } = req.body;
            
            const updatedProfile = await this.profileService.updateProfile(Number(id), { firstName, lastName, profession, balance, type });
    
            if (!updatedProfile) {
                return res.status(404).json({ message: "Perfil não encontrado" });
            }

            return res.status(200).json({ message: `Perfil com ID ${id} foi atualizado com sucesso`, profile: updatedProfile });
        } catch (error) {
            return res.status(500).json({ message: `Falha ao atualizar perfil`, error: (error as Error).message });
        }
    }

    public async deleteProfile(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.profileService.deleteProfile(Number(id));
            return res.status(200).json({ message: `Perfil com ID ${id} foi excluído com sucesso.` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir perfil", error: (error as Error).message });
        }
    }

    public async getBalance(req: Request, res: Response): Promise<Response> {
        const { profileId } = req.params; 
        try {
            const balance = await this.profileService.getBalance(Number(profileId)); 
            return res.status(200).json({ balance });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao verificar saldo", error });
        }
    }

    public async getUnpaidJobsDetails(req: Request, res: Response): Promise<Response> {
        const { profileId } = req.params; 
        try {
            const unpaidJobsDetails = await this.profileService.getUnpaidJobsDetails(Number(profileId)); 
            return res.status(200).json(unpaidJobsDetails);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar detalhes dos jobs não pagos", error });
        }
    }
    
    
    
}
