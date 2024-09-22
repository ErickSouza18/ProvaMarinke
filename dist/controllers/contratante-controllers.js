var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ContratanteService } from "../services/contratante-service.js";
export class ContratanteController {
    constructor() {
        this.contratanteService = new ContratanteService();
    }
    createContratante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nomeCompleto, email, telefone } = req.body;
                const newContratante = yield this.contratanteService.createContratante(nomeCompleto, email, telefone);
                // Removendo os campos indesejados
                const _a = newContratante.toJSON(), { createdAt, updatedAt } = _a, result = __rest(_a, ["createdAt", "updatedAt"]);
                return res.status(201).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao criar contratante", error });
            }
        });
    }
    getAllContratante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratantes = yield this.contratanteService.getAllContratantes();
                if (contratantes.length === 0) {
                    return res.status(404).json({ message: "Nenhum contratante encontrado." });
                }
                // Removendo os campos indesejados de cada contratante
                const result = contratantes.map(contratante => {
                    const _a = contratante.toJSON(), { createdAt, updatedAt } = _a, rest = __rest(_a, ["createdAt", "updatedAt"]);
                    return rest;
                });
                return res.status(201).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao encontrar os contratantes", error });
            }
        });
    }
    deleteContratante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.contratanteService.deleteContratante(Number(id));
                return res.status(200).json({ message: `Contratante com ID ${id} foi excluído com sucesso.` });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao excluir contratante", error });
            }
        });
    }
    updateContratante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // Pega o ID da rota
                const { nomeCompleto, email, telefone } = req.body; // Pega os dados do corpo da requisição
                const updatedContratante = yield this.contratanteService.update(Number(id), { nomeCompleto, email, telefone } // Passa um objeto com os dados
                );
                if (!updatedContratante) {
                    return res.status(404).json({ message: "Contratante não encontrado" });
                }
                // Removendo os campos indesejados
                const result = updatedContratante.get({ plain: true });
                delete result.createdAt;
                delete result.updatedAt;
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `Falha ao atualizar contratante`, error });
            }
        });
    }
    getContratanteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contratante = yield this.contratanteService.findById(Number(id));
                if (!contratante) {
                    return res.status(404).json({ message: `Contratante com ID ${id} não encontrado.` });
                }
                // Removendo os campos indesejados
                const _a = contratante.toJSON(), { createdAt, updatedAt } = _a, result = __rest(_a, ["createdAt", "updatedAt"]);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `Erro ao buscar contratante por ID`, error });
            }
        });
    }
}
