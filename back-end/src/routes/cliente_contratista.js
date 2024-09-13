import { Router } from "express";
import {
   obtenerCliente_Contratista
} from "../controllers/cliente_contratista.js";
const cliente_contratista = Router();
cliente_contratista.get("/cliente_contratista/obtener/:parametro",obtenerCliente_Contratista);




export default cliente_contratista;

