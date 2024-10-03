import { Router } from "express";
import {
  crearFactura,
  obtenerFacturas,
} from "../controllers/Factura_Contratista.js";

const factura_contratista = Router();

factura_contratista.post("/factura_contratista/crear", crearFactura);
factura_contratista.get("/factura_contratista/obtener", obtenerFacturas);

export default factura_contratista;
