import { Request, Response } from "express";
import { ContratanteService } from "../services/contratante-service.js";

export class ContratanteController {
    private contratanteService: ContratanteService;


    constructor() {
        this.contratanteService = new ContratanteService();
    }

    public async createContratante(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeCompleto, email, telefone } = req.body;
            const newContratante = await this.contratanteService.createContratante(nomeCompleto, email, telefone);
    
            return res.status(201).json(newContratante);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar contratante", error: (error as Error).message });
        }
    }
    

    public async getAllContratante(req: Request, res: Response): Promise<Response> {
        try {
            const contratantes = await this.contratanteService.getAllContratantes();

            if (contratantes.length === 0) {
                return res.status(404).json({ message: "Nenhum contratante encontrado." });
            }

            const result = contratantes.map(contratante => {
                const { createdAt, updatedAt, ...rest } = contratante.toJSON();
                return rest;
            });

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao encontrar os contratantes", error });
        }
    }


    public async deleteContratante(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.contratanteService.deleteContratante(Number(id));
            return res.status(200).json({ message: `Contratante com ID ${id} foi excluído com sucesso.` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir contratante", error });
        }
    }


    public async updateContratante(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { nomeCompleto, email, telefone } = req.body; 
            
            const updatedContratante = await this.contratanteService.update(
                Number(id),
                { nomeCompleto, email, telefone }
            );
    
            if (!updatedContratante) {
                return res.status(404).json({ message: "Contratante não encontrado" });
            }
    
            const result = updatedContratante.get({ plain: true });
            delete result.createdAt;
            delete result.updatedAt;
    
            return res.status(200).json({ 
                message: `Contratante com ID ${id} foi atualizado com sucesso`,
                contratante: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar contratante:', error.message);
                return res.status(500).json({ message: `Falha ao atualizar contratante, Mas mesmo assim ele foi atualizado`});
            } else {
                console.error('Erro desconhecido ao atualizar contratante:', error);
                return res.status(500).json({ message: `Falha ao atualizar contratante`, error: 'Erro desconhecido' });
            }
        }
    }
    
    
    
    






    public async getContratanteById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const contratante = await this.contratanteService.findById(Number(id));

            if (!contratante) {
                return res.status(404).json({ message: `Contratante com ID ${id} não encontrado.` });
            }

            // Removendo os campos indesejados
            const { createdAt, updatedAt, ...result } = contratante.toJSON();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar contratante por ID`, error });
        }
    }


}