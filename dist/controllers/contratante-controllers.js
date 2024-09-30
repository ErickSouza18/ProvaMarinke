var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContratanteService } from "../services/contratante-service";
export class ContratanteController {
    constructor() {
        this.contratanteService = new ContratanteService();
    }
    createContratante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nomeCompleto } = req.body;
                const newContratante = yield this.contratanteService.createContratante(nomeCompleto);
                return res.status(201).json(newContratante);
            }
            catch (error) {
                return res.status(500).json({ message: "Failed to create contratante", error });
            }
        });
    }
    getAllContratantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratantes = yield this.contratanteService.getAllContratantes();
                return res.status(200).json(contratantes);
            }
            catch (error) {
                return res.status(500).json({ message: "Failed to fetch contrantates", error });
            }
        });
    }
}
