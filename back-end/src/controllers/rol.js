import Rol from "../models/rol.js";

// Crear un nuevo rol
// export const crearRol = async (req, res, next) => {
//     try {
//         const { nombre } = req.body;
//         const nuevoRol = await Rol.create({ nombre });
//         res.status(200).send({
//             status: "success",
//             mensaje: "Rol creado exitosamente",
//             rol: nuevoRol
//         });
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             mensaje: "Error al crear el rol: " + error
//         });
//     }
// };

// Obtener todos los roles
export const obtenerRoles = async (req, res, next) => {
  try {
    const rol = await Rol.findAll();
    if (rol.length === 0) {
      const columnNames = Object.keys(Rol.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(rol);
    }
  } catch (error) {
    next(error);
  }
};

export default Rol;
