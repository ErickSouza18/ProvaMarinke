import { JobRepository } from "../repositories/job-repository.js";
import { Job, JobCreationAttributes } from "../models/job-models.js";


export class JobService {

  public async createJob(data: JobCreationAttributes): Promise<Job> {
    try {
      const job = await Job.create(data);
      return job;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Impossível criar Job: ${error.message}`);
      } else {
        throw new Error("Um erro desconhecido ocorreu ao criar o Job.");
      }
    }
  }

  public async getAllJobs(): Promise<Job[]> {
    try {
      return await Job.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Impossível encontrar jobs: ${error.message}`);
      } else {
        throw new Error("Um erro desconhecido ocorreu ao buscar os jobs.");
      }
    }
  }

  public async getJobById(id: number): Promise<Job | null> {
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        throw new Error(`Job com ID ${id} não encontrado`);
      }
      return job;
    } catch (error) {
      throw new Error(`Impossível encontrar job pelo ID ${id}: ${(error as Error).message}`);
    }
  }

  public async updateJob(id: number, data: Partial<JobCreationAttributes>): Promise<Job | null> {
    try {
      const [numberOfAffectedRows, [updatedJob]] = await Job.update(data, {
        where: { id },
        returning: true,
      });

      if (numberOfAffectedRows === 0) {
        return null;
      }

      return updatedJob;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Impossível atualizar job: ${error.message}`);
      } else {
        throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o job.");
      }
    }
  }

  public async deleteJob(id: number): Promise<void> {
    try {
      const result = await Job.destroy({
        where: { id },
      });

      if (result === 0) {
        throw new Error(`Job com ID ${id} não encontrado`);
      }
    } catch (error) {
      throw new Error(`Impossível excluir job com ID ${id}: ${(error as Error).message}`);
    }
  }


  public async getJobsByContractId(contractId: number): Promise<Job[]> {
    try {
      return await Job.findAll({
        where: { contractId } 
      });
    } catch (error) {
      throw new Error(`Impossível encontrar jobs para o contrato com ID ${contractId}: ${(error as Error).message}`);
    }
  }



}

