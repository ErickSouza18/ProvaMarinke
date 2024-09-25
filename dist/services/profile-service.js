var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Profile } from "../models/profile-models.js";
export class ProfileService {
    createProfile(firstName, lastName, profession, balance, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Profile.create({ firstName, lastName, profession, balance, type });
            }
            catch (error) {
                throw new Error(`Impossível criar perfil: ${error.message}`);
            }
        });
    }
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Profile.findAll();
            }
            catch (error) {
                throw new Error(`Impossível encontrar perfis: ${error.message}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Profile.findByPk(id);
            }
            catch (error) {
                throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${error.message}`);
            }
        });
    }
    updateProfile(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile.findByPk(id);
                if (!profile) {
                    return null;
                }
                yield profile.update(data);
                return profile;
            }
            catch (error) {
                throw new Error(`Impossível atualizar perfil com ID ${id}: ${error.message}`);
            }
        });
    }
    deleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Profile.destroy({
                    where: { id }
                });
                if (result === 0) {
                    throw new Error(`Perfil com ID ${id} não encontrado`);
                }
            }
            catch (error) {
                throw new Error(`Impossível excluir perfil com ID ${id}: ${error.message}`);
            }
        });
    }
}
