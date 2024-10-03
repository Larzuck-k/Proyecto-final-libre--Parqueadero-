import { Op } from "sequelize";
import contrato from "../models/contrato.js";
import espacio from "../models/espacio.js";
import factura_contratista from "../models/factura_contratista.js";
import Contratista from "./contratista.js";

// Crear una nueva factura
export const crearFactura = async (req, res, next) => {
  try {
    const { id_parqueadero, id_espacio } = req.body;

    const Espacio = await espacio.findOne({
      where: {
        [Op.and]: {
          estado: "Ocupado",
          id: id_espacio,
          id_parqueadero,
        },
      },
    });

    if (!Espacio) {
      res.status(400).send({
        status: "error",
        mensaje: "No se encontró el espacio",
      });
    }
    const Contrato = await contrato.findOne({
      where: { [Op.and]: { id_espacio: Espacio.id, estado: 1 } },
    });

    if (!Contrato) {
      res.status(400).send({
        status: "error",
        mensaje: "No se encontró el contrato a facturar",
      });
    }

    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

    const nuevaFactura = await factura_contratista.create({
      fecha_emision: localNow,
      monto_total: Contrato.valor_contrato,
      id_contratista: Contrato.id_contratista,
      id_contrato: Contrato.id,
    });
    Espacio.estado = "Disponible";
    await Espacio.save();
    res.status(200).send({
      status: "success",
      mensaje: "Factura creada exitosamente",
      factura: nuevaFactura,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener todas las facturas
export const obtenerFacturas = async (req, res, next) => {
  try {
    const factura = await factura_contratista.findAll({
      attributes: [
        "id",
        "fecha_emision",
        "monto_total",
        ["id_contrato", "id_contrato_temporal"],
      ],
      include: {
        model: Contratista,
        attributes: ["identificacion", "nombre"],
        as: "contratista_table",
      },
    });

    factura.map((e) => {
      const data = e.dataValues;
      data.identificacion = e.contratista_table.identificacion;
      data.contratista = e.contratista_table.nombre;
      data.id_contrato = data.id_contrato_temporal;
      delete data.contratista_table;
      delete data.id_contrato_temporal;

      return data;
    });

    if (factura.length === 0) {
      const columnNames = Object.keys(factura_contratista.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      delete emptyObject.id_contrato_temporal;
      emptyObject.identificacion = "";
      emptyObject.contratista = "";
      emptyObject.id_contrato = "";
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(factura);
    }
  } catch (error) {
    next(error);
  }
};

export default factura_contratista;
