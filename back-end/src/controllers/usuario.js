import usuario from '../models/usuario.js';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        const { Nombre, Email, Contraseña, ID_Rol } = req.body;
        const hashedPassword = bcrypt.hashSync(Contraseña, 10);
        const nuevoUsuario = await Usuario.create({
            Nombre,
            Email,
            Contraseña: hashedPassword,
            ID_Rol
        });
        res.status(200).send({
            status: "success",
            mensaje: "Usuario creado exitosamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el usuario: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const usuario = await Usuario.findByPk(id);
  
      if (usuario) {
        const estadoActual = usuario.Estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        usuario.Estado = nuevoEstado;
        await usuario.save(); 
        res.status(200).send({
          status: "success",
          mensaje: "Se ha actualizado el actualizado exitosamente"
        });
      } else {
        res.status(404).send({
          status: "error",
          mensaje: "Registro no encontrado"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Error al cambiar el estado: " + error
      });
    }
  };


// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {



    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            const columnNames = Object.keys(Usuario.getAttributes());
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
            res.status(200).send(usuarios);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los usuarios: " + error
        });
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { ID } = req.body;
        const { Nombre, Email, Contraseña, ID_Rol } = req.body;
        const usuario = await Usuario.findByPk(ID);

        if (usuario) {
            if (Contraseña) {
                usuario.Contraseña = bcrypt.hashSync(Contraseña, 10);
            }
            usuario.Nombre = Nombre || usuario.Nombre;
            usuario.Email = Email || usuario.Email;
            usuario.ID_Rol = ID_Rol || usuario.ID_Rol;

            await usuario.save();
            res.status(200).send({
                status: "success",
                mensaje: "Usuario actualizado exitosamente",
                usuario
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el usuario: " + error
        });
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            await usuario.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Usuario eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el usuario: " + error
        });
    }
};
export default Usuario