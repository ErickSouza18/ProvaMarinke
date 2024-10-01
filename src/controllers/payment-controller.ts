import { Request, Response } from "express";
import { PaymentService } from "../services/payment-service.js";

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public async createPayment(req: Request, res: Response): Promise<Response> {
        try {
            const { jobId, operationDate, paymentValue, clientId } = req.body;
            const newPayment = await this.paymentService.createPayment(jobId, operationDate, paymentValue, clientId);
            return res.status(201).json(newPayment);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar pagamento", error: (error as Error).message });
        }
    }

    public async getAllPayments(req: Request, res: Response): Promise<Response> {
        try {
            const payments = await this.paymentService.getAllPayments();
            if (payments.length === 0) {
                return res.status(404).json({ message: "Nenhum pagamento encontrado." });
            }
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao encontrar pagamentos", error });
        }
    }

    public async getPaymentById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const payment = await this.paymentService.findById(Number(id));
            if (!payment) {
                return res.status(404).json({ message: `Pagamento com ID ${id} não encontrado.` });
            }
            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar pagamento por ID`, error });
        }
    }

    public async deletePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.paymentService.deletePayment(Number(id));
            return res.status(200).json({ message: `Pagamento com ID ${id} foi excluído com sucesso.` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir pagamento", error });
        }
    }

    public async updatePayment(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { jobId, profileId, operationDate, paymentValue } = req.body; 
            const updatedPayment = await this.paymentService.update(Number(id), { jobId, operationDate, paymentValue });

            if (!updatedPayment) {
                return res.status(404).json({ message: "Pagamento não encontrado" });
            }

            return res.status(200).json({ 
                message: `Pagamento com ID ${id} foi atualizado com sucesso`,
                payment: updatedPayment 
            });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar pagamento", error });
        }
    }
}
