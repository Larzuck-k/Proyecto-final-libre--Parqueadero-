import Rol from '../models/rol.js';
import rol from '../routes/rol.js';

// Crear un nuevo rol
export const crearRol = async (req, res) => {
    try {
        const { Nombre } = req.body;
        const nuevoRol = await Rol.create({ Nombre });
        res.status(200).send({
            status: "success",
            mensaje: "Rol creado exitosamente",
            rol: nuevoRol
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el rol: " + error
        });
    }
};

// Obtener todos los roles
export const obtenerRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.status(200).send(roles);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los roles: " + error
        });
    }
};


// Eliminar un rol
export const eliminarRol = async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Rol.findByPk(id);
      if (!rol) {
        res.status(404).send({
          status: "error",
          mensaje: "Rol no encontrado"
        });
      } else {
        await rol.destroy();
        res.status(200).send({
          status: "success",
          mensaje: "Rol eliminado exitosamente"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Error al eliminar el rol: " + error
      });
    }
  };

  export default Rol