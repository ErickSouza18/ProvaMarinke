var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contratante } from "../models/contratante-models.js";
export class ContratanteService {
    createContratante(nomeCompleto, email, telefone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield Contratante.create({ nomeCompleto, email, telefone });
                return contratante;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossivel criar Contratente: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu");
                }
            }
        });
    }
    getAllContratantes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossivel encontrar contratantes ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu");
                }
            }
        });
    }
    deleteContratante(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Contratante.destroy({
                    where: { id }
                });
                if (result === 0) {
                    throw new Error(`Contratante com ID ${id} não encontrado`);
                }
            }
            catch (error) {
                throw new Error(`Impossível excluir contratante com ID ${id}: ${error.message}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [numberOfAffectedRows, [updatedContratante]] = yield Contratante.update(data, { where: { id }, returning: true });
                if (numberOfAffectedRows === 0) {
                    return null;
                }
                return updatedContratante;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar contratante: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contratante.");
                }
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findByPk(id);
            }
            catch (error) {
                throw new Error(`Impossível encontrar contratante pelo ID ${id}: ${error.message}`);
            }
        });
    }
}
