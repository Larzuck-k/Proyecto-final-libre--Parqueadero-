import { Router } from "express";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  cambiarEstado,
} from "../controllers/usuario.js";
const usuario = Router();

usuario.post("/usuario/crear", crearUsuario);
usuario.get("/usuario/obtener", obtenerUsuarios);
usuario.put("/usuario/editar", actualizarUsuario);
usuario.post("/usuario/estado", cambiarEstado);

export default usuario;
