import { Request, Response } from "express";
import { ContratanteService } from "../services/contratante-service";

export class ContratanteController {
    private contratanteService: ContratanteService;

    constructor() {
        this.contratanteService = new ContratanteService();
    }

    public async createContratante(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeCompleto } = req.body;
            const newContratante = await this.contratanteService.createContratante(nomeCompleto);
            return res.status(201).json(newContratante);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create contratante", error });
        }
    }

    public async getAllContratantes(req: Request, res: Response): Promise<Response> {
        try {
            const contratantes = await this.contratanteService.getAllContratantes();
            return res.status(200).json(contratantes);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch contrantates", error });
        }
    }
}