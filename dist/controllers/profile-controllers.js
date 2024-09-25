var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProfileService } from "../services/profile-service.js";
export class ProfileController {
    constructor() {
        this.profileService = new ProfileService();
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, profession, balance, type } = req.body; // Mantenha as chaves corretas
                const newProfile = yield this.profileService.createProfile(firstName, lastName, profession, balance, type);
                return res.status(201).json(newProfile);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao criar perfil", error: error.message });
            }
        });
    }
    getAllProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profiles = yield this.profileService.getAllProfiles();
                if (profiles.length === 0) {
                    return res.status(404).json({ message: "Nenhum perfil encontrado." });
                }
                return res.status(200).json(profiles);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao encontrar os perfis", error });
            }
        });
    }
    getProfileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const profile = yield this.profileService.findById(Number(id));
                if (!profile) {
                    return res.status(404).json({ message: `Perfil com ID ${id} não encontrado.` });
                }
                return res.status(200).json(profile);
            }
            catch (error) {
                return res.status(500).json({ message: `Erro ao buscar perfil por ID`, error });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { firstName, lastName, profession, balance, type } = req.body;
                const updatedProfile = yield this.profileService.updateProfile(Number(id), { firstName, lastName, profession, balance, type });
                if (!updatedProfile) {
                    return res.status(404).json({ message: "Perfil não encontrado" });
                }
                return res.status(200).json({ message: `Perfil com ID ${id} foi atualizado com sucesso`, profile: updatedProfile });
            }
            catch (error) {
                return res.status(500).json({ message: `Falha ao atualizar perfil`, error: error.message });
            }
        });
    }
    deleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.profileService.deleteProfile(Number(id));
                return res.status(200).json({ message: `Perfil com ID ${id} foi excluído com sucesso.` });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao excluir perfil", error: error.message });
            }
        });
    }
}
