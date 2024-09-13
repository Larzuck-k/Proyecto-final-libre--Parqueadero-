import { Router } from "express";
import { crearTipo_Ocupacion,obtenerTipo_Ocupacion,actualizarTipo_Ocupacion } from "../controllers/tipo_ocupacion.js";
const tipoOcupacion = Router();

tipoOcupacion.post("/tipo_ocupacion/crear", crearTipo_Ocupacion);
tipoOcupacion.get("/tipo_ocupacion/obtener", obtenerTipo_Ocupacion);
tipoOcupacion.put("/tipo_ocupacion/editar", actualizarTipo_Ocupacion);


export default tipoOcupacion;
