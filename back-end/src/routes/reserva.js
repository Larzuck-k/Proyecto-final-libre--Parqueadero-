import { Router } from "express";
import {
  obtenerReservas,
  crearReserva,
  cambiarEstado,
} from "../controllers/reserva.js";

const reserva = Router();

reserva.post("/reserva/crear", crearReserva);
reserva.get("/reserva/obtener", obtenerReservas);
reserva.post("/reserva/estado", cambiarEstado);

export default reserva;
