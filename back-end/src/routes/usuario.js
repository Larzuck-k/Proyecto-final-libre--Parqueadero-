import { Router } from "express";
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} from "../controllers/usuario.js";
const usuario = Router();


usuario.post("/usuario/crear", crearUsuario);
usuario.get("/usuario/obtener", obtenerUsuarios);
usuario.delete("/usuario/eliminar", eliminarUsuario);
usuario.put("/usuario/editar", actualizarUsuario);


export default usuario;
