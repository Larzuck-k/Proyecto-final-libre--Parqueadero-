import { Router } from "express";
import {
    obtenerReservas,
  crearReserva,
  eliminarReserva,
  actualizarReserva
} from "../controllers/reserva.js";
const reserva = Router();


reserva.post("/reserva/crear", crearReserva);
reserva.get("/reserva/obtener", obtenerReservas);
reserva.delete("/reserva/eliminar", eliminarReserva);
reserva.put("/reserva/editar", actualizarReserva);

export default reserva;
