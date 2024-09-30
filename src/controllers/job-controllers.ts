import { Request, Response } from "express";
import { JobService } from "../services/job-service.js";

export class JobController {
  private jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  public async createJob(req: Request, res: Response): Promise<Response> {
    try {
      const job = await this.jobService.createJob(req.body);
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar Job", error: (error as Error).message });
    }
  }

  public async getAllJobs(req: Request, res: Response): Promise<Response> {
    try {
      const jobs = await this.jobService.getAllJobs();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar Jobs", error: (error as Error).message });
    }
  }

  public async getJobById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const job = await this.jobService.getJobById(Number(id));
      if (!job) return res.status(404).json({ message: "Job não encontrado" });

      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar Job", error: (error as Error).message });
    }
  }

  public async updateJob(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const job = await this.jobService.updateJob(Number(id), req.body);

      if (!job) return res.status(404).json({ message: "Job não encontrado" });

      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar Job", error: (error as Error).message });
    }
  }

  public async deleteJob(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.jobService.deleteJob(Number(id));
      return res.status(200).json({ message: "Job excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir Job", error: (error as Error).message });
    }
  }

  public async getJobsByContractId(req: Request, res: Response): Promise<Response> {
    const { contractId } = req.params; // Supondo que o ID do contrato é passado como parâmetro
    try {
        const jobs = await this.jobService.getJobsByContractId(Number(contractId));

        if (jobs.length === 0) {
            return res.status(404).json({ message: `Nenhum job encontrado para o contrato com ID ${contractId}.` });
        }

        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar jobs do contrato", error });
    }
}

}
