import {request, Response} from "express";
import {ContratanteService} from "../services/contratante-service.js";

export class ContratanteController{
    private contratanteService = new ContratanteService();

}