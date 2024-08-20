import { Router } from "express";
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  cambiarEstado
} from "../controllers/usuario.js";
const usuario = Router();


usuario.post("/usuario/crear", crearUsuario);
usuario.get("/usuario/obtener", obtenerUsuarios);
usuario.delete("/usuario/eliminar", eliminarUsuario);
usuario.put("/usuario/editar", actualizarUsuario);
usuario.post("/usuario/estado", cambiarEstado);


export default usuario;
