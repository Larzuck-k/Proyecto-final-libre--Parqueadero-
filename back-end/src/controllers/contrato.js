import Contrato from "../models/contrato.js";
import db from "../models/db.js";
import espacio from "../models/espacio.js";
import { Op } from "sequelize";
import Contratista from "../models/contratista.js";
import Detalle_Cliente from "./detalle_cliente.js";

// Crear un nuevo contrato
export const crearContrato = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { tiempo, cantidad, id_contratista, id_espacio } = req.body;
    let totalTiempo = 0;
    if (cantidad == 0) {
      transaction.rollback();
      return res.status(400).send({
        status: "error",
        mensaje: "La cantidad no puede ser 0",
      });
    }

    switch (tiempo) {
      case "1":
        totalTiempo = cantidad * 24 * 60 * 60 * 1000; // Días a milisegundos
        break;
      case "2":
        totalTiempo = cantidad * 30 * 24 * 60 * 60 * 1000; // Meses a milisegundos (30 días por mes)
        break;
      default:
        transaction.rollback();
        return res.status(400).send({
          status: "error",
          mensaje: "No se seleccionó el tiempo",
        });
    }
    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const fechaInicial = new Date(now.getTime() + offset * 60 * 60 * 1000);
    // Sumar el tiempo
    const fechaFinal = localNow.setTime(localNow.getTime() + totalTiempo);

    const contratista = await Contratista.findByPk(id_contratista);

    if (!contratista) {
      await transaction.rollback();
      return res.status(400).send({
        status: "error",
        mensaje: "Contratista no encontrado",
      });
    }
    const nuevoContrato = await Contrato.create(
      {
        fecha_inicio: fechaInicial,
        fecha_fin: fechaFinal,
        id_contratista: contratista.id,
        id_espacio,
      },
      { transaction }
    );
    await espacio.update(
      { estado: "Ocupado" },
      { where: { id: id_espacio }, transaction }
    );
    await transaction.commit();
    res.status(200).send({
      status: "success",
      mensaje: "Contrato creado exitosamente",
      contrato: nuevoContrato,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const cambiarEstado = async (req, res, next) => {
  try {
    const { id } = req.body;
    const contrato = await Contrato.findByPk(id);

    if (contrato) {
      const estadoActual = contrato.estado;
      const nuevoEstado = estadoActual === 0 ? 1 : 0;
      contrato.estado = nuevoEstado;
      await contrato.save();
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

// Obtener todos los contratos
export const obtenerContratos = async (req, res, next) => {
  try {
    const contratos = await Contrato.findAll();
    if (contratos.length === 0) {
      const columnNames = Object.keys(Contrato.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(contratos);
    }
  } catch (error) {
    next(error);
  }
};

// Obtener todos los contratos
export const obtenerContrato = async (req, res, next) => {
  try {
    const id = req.query.id;

    const contrato = await Contrato.findOne({
      where: { [Op.and]: { estado: 1, id_espacio: id } },
    });
    if (contrato) {
      const contratista = await Contratista.findByPk(contrato.id_contratista);

      res
        .status(200)
        .send({ status: "success", data: [contrato, contratista] });
    } else {
      const detalleCliente = await Detalle_Cliente.findOne({
        where: { [Op.and]: { hora_salida: null, id_espacio: id } },
      });
      if (detalleCliente) {
        return res
          .status(200)
          .send({ status: "success", data: [detalleCliente] });
      }
      res.status(404).send({
        status: "error",
        mensaje: "Información del espacio no encontrada",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Actualizar un contrato
export const actualizarContrato = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin, id_contratista, id_espacio } = req.body;
    const contrato = await Contrato.findByPk(id);

    if (contrato) {
      contrato.fecha_inicio = fecha_inicio || contrato.fecha_inicio;
      contrato.fecha_fin = fecha_fin || contrato.fecha_fin;
      contrato.id_contratista = id_contratista || contrato.id_contratista;
      contrato.id_espacio = id_espacio || contrato.id_espacio;
      await contrato.save();
      res.status(200).send({
        status: "success",
        mensaje: "Contrato actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Contrato no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default Contrato;
