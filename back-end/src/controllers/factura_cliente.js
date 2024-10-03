import { Op } from "sequelize";
import factura_cliente from "../models/factura_cliente.js";
import espacio from "../models/espacio.js";
import detalle_cliente from "../models/detalle_cliente.js";

// Crear una nueva factura
export const crearFactura = async (req, res, next) => {
  try {
    const { id_parqueadero, id_espacio, valor_hora } = req.body;
    const Espacio = await espacio.findOne({
      where: {
        [Op.and]: {
          estado: "Ocupado",
          id: id_espacio,
          id_parqueadero: id_parqueadero,
        },
      },
    });

    if (!Espacio) {
      res.status(400).send({
        status: "error",
        mensaje: "No se encontró el espacio",
      });
    }

    const cliente = await detalle_cliente.findOne({
      where: { [Op.and]: { id_espacio: Espacio.id, hora_salida: null } },
    });
    if (!cliente) {
      res.status(400).send({
        status: "error",
        mensaje: "No se encontró el cliente a facturar",
      });
    }

    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = localNow - cliente.hora_entrada;

    // Convertir la diferencia de milisegundos a horas
    const horas = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60));

    const monto_total = horas * valor_hora;

    const nuevaFactura = await factura_cliente.create({
      fecha_emision: localNow,
      valor_hora,
      monto_total,
      id_detalle_cliente: cliente.id,
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
    const Factura = await factura_cliente.findAll();
    if (Factura.length === 0) {
      const columnNames = Object.keys(factura_cliente.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(Factura);
    }
  } catch (error) {
    next(error);
  }
};

export default factura_cliente;
