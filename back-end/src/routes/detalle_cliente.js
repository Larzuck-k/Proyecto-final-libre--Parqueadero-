import { Router } from "express";
import { CrearDetalleCliente } from "../controllers/detalle_cliente.js";
const detalle_cliente = Router();
detalle_cliente.post("/detalleCliente/crear", CrearDetalleCliente);

export default detalle_cliente;
