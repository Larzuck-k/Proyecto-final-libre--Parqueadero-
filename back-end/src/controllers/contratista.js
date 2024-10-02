import { Op } from "sequelize";
import Contratista from "../models/contratista.js";

// Crear un nuevo contratista
export const crearContratista = async (req, res, next) => {
  try {
    const { identificacion, nombre, email, telefono, id_usuario } = req.body;

    const nuevoContratista = await Contratista.create({
      identificacion,
      nombre,
      email,
      telefono,
      id_usuario,
    });

    res.status(200).send({
      status: "success",
      mensaje: "Contratista creado exitosamente",
      contratista: nuevoContratista,
    });
  } catch (error) {
    next(error);
  }
};

export const cambiarEstado = async (req, res, next) => {
  try {
    const { id } = req.body;
    const contratista = await Contratista.findByPk(id);

    if (contratista) {
      contratista.estado = contratista.estado == 1 ? 0 : 1;
      // Guardar los cambios
      await contratista.save();
      res.status(200).send({
        status: "success",
        mensaje: "Se ha actualizado el actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Registro no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Obtener todos los contratistas
export const obtenerContratistas = async (req, res, next) => {
  try {
    const contratistas = await Contratista.findAll();

    if (contratistas.length === 0) {
      const columnNames = Object.keys(Contratista.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(contratistas);
    }
  } catch (error) {
    next(error);
  }
};
// Obtener todos los contratistas
export const obtenerContratistaByPk = async (req, res, next) => {
  try {
    const parametro = req.query.parametro;
    const contratista = await Contratista.findAll({
      where: {
        [Op.or]: {
          identificacion: parametro,
          nombre: { [Op.like]: "%" + parametro + "%" },
        },
      },
    });

    if (contratista.length == 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(contratista);
    }
  } catch (error) {
    next(error);
  }
};

// Actualizar un contratista
export const actualizarContratista = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { identificacion, nombre, email, telefono, id_usuario } = req.body;
    const contratista = await Contratista.findByPk(id);

    if (contratista) {
      contratista.identificacion = identificacion || contratista.identificacion;
      contratista.nombre = nombre || contratista.nombre;
      contratista.email = email || contratista.email;
      contratista.telefono = telefono || contratista.telefono;
      contratista.id_usuario = id_usuario || contratista.id_usuario;
      await contratista.save();
      res.status(200).send({
        status: "success",
        mensaje: "Contratista actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Contratista no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default Contratista;
