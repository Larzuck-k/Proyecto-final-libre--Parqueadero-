import { Router } from "express";
import {
  CrearDetalleCliente,
  ObtenerClientes,
} from "../controllers/detalle_cliente.js";
const detalle_cliente = Router();
detalle_cliente.post("/detalleCliente/crear", CrearDetalleCliente);
detalle_cliente.get("/detalleCliente/obtener", ObtenerClientes);
export default detalle_cliente;
