import contratosModel from "../models/contratos.js";
import Contrato from "../models/contrato.js";
import db from "../models/db.js";
import espacio from "../models/espacio.js";
import contratos from "../models/contratos.js";
import { Op } from "sequelize";
import Contratista from "../models/contratista.js";
import Cliente_Contratista from "../models/cliente_contratista.js";
import Cliente from "../models/cliente_normal.js";

// Crear un nuevo contrato
export const crearContrato = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { tiempo, id_cliente_contratista, id_contratos, id_espacio, tipo } =
      req.body;

    const tipo_contratos = await contratos.findOne({
      where: { id: id_contratos },
    });

    if (!tipo_contratos) {
      res.status(400).send({
        status: "error",
        mensaje: "Algo ocurrió al traer el tipo de contrato",
      });
      return;
    }
    const tiempoContrato = tipo_contratos.tiempo;

    let totalTiempo;

    switch (tiempoContrato) {
      case "Minutos":
        totalTiempo = tiempo * 60 * 1000; // Minutos a milisegundos
        break;
      case "Horas":
        totalTiempo = tiempo * 60 * 60 * 1000; // Horas a milisegundos
        break;
      case "Dias":
        totalTiempo = tiempo * 24 * 60 * 60 * 1000; // Días a milisegundos
        break;
      case "Meses":
        totalTiempo = tiempo * 30 * 24 * 60 * 60 * 1000; // Meses a milisegundos (30 días por mes)
        break;
    }

    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const fechaInicial = new Date(now.getTime() + offset * 60 * 60 * 1000);
    // Sumar el tiempo
    const fechaFinal = localNow.setTime(localNow.getTime() + totalTiempo);

    // Buscar el cliente contratista basado en id_cliente o id_contratista
    let cliente_contratista = null;
    if (tipo == "Contratista") {
      cliente_contratista = await Cliente_Contratista.findOne(
        {
          where: {
            id_contratista: id_cliente_contratista,
          },
        },
        { transaction }
      );
    } else {
      cliente_contratista = await Cliente_Contratista.findOne(
        {
          where: {
            id_cliente: id_cliente_contratista,
          },
        },
        { transaction }
      );
    }

    // Asegúrate de que se encontró un cliente_contratista válido
    if (!cliente_contratista) {
      await transaction.rollback();
      return res.status(400).send({
        status: "error",
        mensaje: "Cliente o contratista no encontrado",
      });
    }
    const nuevoContrato = await Contrato.create(
      {
        fecha_inicio: fechaInicial,
        fecha_fin: fechaFinal,
        id_cliente_contratista: cliente_contratista.id,
        id_contratos,
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
    const contratos = await Contrato.findAll({
      include: {
        model: contratosModel,
        attributes: ["valor", "tipo", "tiempo"],
        as: "Contratos",
      },
    });
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
      const contratista_cliente = await Cliente_Contratista.findOne({
        where: {
          id: contrato.id_cliente_contratista,
        },
      });
      let cliente = null;

      if (contratista_cliente.id_contratista != null) {
        cliente = await Contratista.findOne({
          where: { id: contratista_cliente.id_contratista },
        });
      } else {
        cliente = await Cliente.findOne({
          where: { id: contratista_cliente.id_cliente },
        });
      }
      res.status(200).send({ status: "success", data: [contrato, cliente] });
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

// Actualizar un contrato
export const actualizarContrato = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fecha_inicio,
      fecha_fin,
      id_cliente_contratista,
      id_contratos,
      id_espacio,
    } = req.body;
    const contrato = await Contrato.findByPk(id);

    if (contrato) {
      contrato.fecha_inicio = fecha_inicio || contrato.fecha_inicio;
      contrato.fecha_fin = fecha_fin || contrato.fecha_fin;
      contrato.id_contratos = id_contratos || contrato.id_contratos;
      contrato.id_cliente_contratista =
        id_cliente_contratista || contrato.id_cliente_contratista;
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

// Eliminar un contrato
export const eliminarContrato = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contrato = await Contrato.findByPk(id);

    if (contrato) {
      await contrato.destroy();
      res.status(200).send({
        status: "success",
        mensaje: "Contrato eliminado exitosamente",
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
