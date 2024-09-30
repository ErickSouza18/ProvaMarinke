import { Request, Response } from "express";
import { DepositService } from "../services/deposit-service.js";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    public async createDeposit(req: Request, res: Response): Promise<Response> {
        try {
            const { clientId, operationDate, depositValue } = req.body;

            if (depositValue < 0) {
                return res.status(400).json({ message: "Valor de depósito não pode ser negativo." });
            }

            const newDeposit = await this.depositService.createDeposit(clientId, operationDate, depositValue);
            return res.status(201).json(newDeposit);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar depósito", error: (error as Error).message });
        }
    }

    public async getAllDeposits(req: Request, res: Response): Promise<Response> {
        try {
            const deposits = await this.depositService.getAllDeposits();
            if (deposits.length === 0) {
                return res.status(404).json({ message: "Nenhum depósito encontrado." });
            }
            return res.status(200).json(deposits);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao encontrar depósitos", error });
        }
    }

    public async getDepositById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deposit = await this.depositService.findById(Number(id));
            if (!deposit) {
                return res.status(404).json({ message: `Depósito com ID ${id} não encontrado.` });
            }
            return res.status(200).json(deposit);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar depósito por ID`, error });
        }
    }

    public async deleteDeposit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.depositService.deleteDeposit(Number(id));
            return res.status(200).json({ message: `Depósito com ID ${id} foi excluído com sucesso.` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir depósito", error });
        }
    }

    public async updateDeposit(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { clientId, operationDate, depositValue } = req.body; 
            const updatedDeposit = await this.depositService.update(Number(id), { clientId, operationDate, depositValue });

            if (!updatedDeposit) {
                return res.status(404).json({ message: "Depósito não encontrado" });
            }

            return res.status(200).json({ 
                message: `Depósito com ID ${id} foi atualizado com sucesso`,
                deposit: updatedDeposit 
            });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar depósito", error });
        }
    }
}
