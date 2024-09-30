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
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield Contratante.create(data);
                return contratante;
            }
            catch (error) {
                throw new Error(`Unable to create contratante: ${error.message}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findAll();
            }
            catch (error) {
                throw new Error(`Unable to fetch contratantes: ${error.message}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Contratante.findByPk(id);
            }
            catch (error) {
                throw new Error(`Unable to find contratantes with ID ${id}: ${error.message}`);
            }
        });
    }
}
