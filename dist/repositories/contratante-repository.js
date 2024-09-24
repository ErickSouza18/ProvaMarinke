var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contratante } from "../models/contratante-models";
export class ContratanteRepository {
    //criar contratante
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield Contratante.create(data);
                return contratante;
            }
            catch (error) {
                throw new Error(`Impossível criar contratante: ${error.message}`);
            }
        });
    }
    //encontrar todos contratantes
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findAll();
            }
            catch (error) {
                throw new Error(`Impossivel incontrar contratantes: ${error.message}`);
            }
        });
    }
    //encontrar contratante por id 
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findByPk(id);
            }
            catch (error) {
                throw new Error(`Impossivel de encontrar contratante pelo ID ${id}: ${error.message}`);
            }
        });
    }
    // Atualizar contratante por ID
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield Contratante.findByPk(id);
                if (!contratante) {
                    throw new Error(`Contratante com ID ${id} não encontrado`);
                }
                yield contratante.update(data);
                return contratante;
            }
            catch (error) {
                throw new Error(`Impossível atualizar contratante com ID ${id}: ${error.message}`);
            }
        });
    }
    // Excluir contratante por ID
    delete(id) {
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
}
