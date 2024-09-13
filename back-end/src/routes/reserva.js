import { Router } from "express";
import {
    obtenerReservas,
  crearReserva,
} from "../controllers/reserva.js";
const reserva = Router();


reserva.post("/reserva/crear", crearReserva);
reserva.get("/reserva/obtener", obtenerReservas);

export default reserva;
