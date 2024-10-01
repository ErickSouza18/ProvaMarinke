import { Deposit } from "../models/deposit-models.js";
import { Payment, PaymentCreationAttributes } from "../models/Payment-models.js";
import { PaymentRepository } from "../repositories/payment-repository.js";
import { DepositRepository } from "../repositories/deposit-repository.js";

export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    public async createPayment(jobId: number, operationDate: Date, paymentValue: number, clientId: number): Promise<Payment> {
        try {
            return await this.paymentRepository.create({ jobId, operationDate, paymentValue, clientId });
        } catch (error) {
            throw new Error(`Impossível criar pagamento: ${(error as Error).message}`);
        }
    }


    public async getAllPayments(): Promise<Payment[]> {
        try {
            return await this.paymentRepository.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar pagamentos: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Payment | null> {
        try {
            return await this.paymentRepository.findById(id);
        } catch (error) {
            throw new Error(`Impossível encontrar pagamento pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        try {
            return await this.paymentRepository.update(id, data);
        } catch (error) {
            throw new Error(`Impossível atualizar pagamento: ${(error as Error).message}`);
        }
    }

    public async deletePayment(id: number): Promise<void> {
        try {
            await this.paymentRepository.delete(id);
        } catch (error) {
            throw new Error(`Impossível excluir pagamento com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async getBalance(profileId: number): Promise<number> {
        try {
            const totalPayments = await Payment.sum('paymentValue', {
                where: { clientId: profileId },
            }) || 0; // Se não houver pagamentos, considerar 0
            
            const totalDeposits = await Deposit.sum('depositValue', {
                where: { clientId: profileId },
            }) || 0; // Se não houver depósitos, considerar 0
            
            return totalDeposits - totalPayments; // Retorna o saldo
        } catch (error) {
            throw new Error(`Erro ao calcular saldo: ${(error as Error).message}`);
        }
    }
    
}
