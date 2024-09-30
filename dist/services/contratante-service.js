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
export class ContratanteService {
    createContratante(nomeCompleto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield Contratante.create({ nomeCompleto });
                return contratante;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Unable to create contratante: ${error.message}`);
                }
                else {
                    throw new Error("An unknown error occurred.");
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
                    throw new Error('Unable to fetch contratantes: ${error.message}');
                }
                else {
                    throw new Error("An unknown error occurred.");
                }
            }
        });
    }
}
