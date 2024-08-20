import { Router } from "express";
import {
    obtenerReservas,
  crearReserva,
  eliminarReserva,
  actualizarReserva,cambiarEstado
} from "../controllers/reserva.js";
const reserva = Router();


reserva.post("/reserva/crear", crearReserva);
reserva.get("/reserva/obtener", obtenerReservas);
reserva.delete("/reserva/eliminar", eliminarReserva);
reserva.put("/reserva/editar", actualizarReserva);
reserva.post("/reserva/estado", cambiarEstado);

export default reserva;
