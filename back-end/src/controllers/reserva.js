import { Op } from "sequelize";
import Cliente_Contratista from "../models/cliente_contratista.js";
import Reserva from "../models/reserva.js";
import db from "../models/db.js";
import espacio from "../models/espacio.js";

// Crear una nueva reserva
export const crearReserva = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { id_cliente_contratista, id_espacio, tipo } = req.body;

    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

    // Buscar la última reserva de este cliente contratista
    const lastReserva = await Reserva.findOne({
      where: { id_cliente_contratista: id_cliente_contratista },
      order: [["id", "DESC"]],
      limit: 1,
    });

    // Si hay una última reserva y aún está activa (fin_reserva > localNow)
    if (lastReserva) {
      if (new Date(lastReserva.fin_reserva).getTime() > localNow.getTime()) {
        return res.status(200).send({
          status: "warning",
          mensaje: "Ya hay una reserva de este cliente activa",
        });
      } else {
        // Actualiza el estado de la última reserva si ya ha caducado
        await lastReserva.update({ estado: 0 }, { transaction });
      }
    }

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

    // Sumar 15 minutos
    localNow.setTime(localNow.getTime() + 15 * 60 * 1000);
    // Crear una nueva reserva
    const nuevaReserva = await Reserva.create(
      {
        id_cliente_contratista: cliente_contratista.id, // Asignar el id encontrado
        id_espacio,
        fin_reserva: localNow, // Hora actual + 15 minutos
        estado: 1,
      },
      { transaction } // Asegurarse de pasar el objeto de transacción correctamente
    );
    await espacio.update(
      { estado: "Reservado" }, // Valores a actualizar
      { where: { id: id_espacio }, transaction } // Condición para seleccionar el registro y objeto de transacción
    );

    await transaction.commit();
    // Enviar la respuesta con la nueva reserva
    res.status(200).send({
      status: "success",
      mensaje: "Reserva creada exitosamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Obtener todas las reservas
export const obtenerReservas = async (req, res, next) => {
  try {
    const reserva = await Reserva.findAll();
    if (reserva.length === 0) {
      const columnNames = Object.keys(Reserva.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(reserva);
    }
  } catch (error) {
    next(error);
  }
};

export default Reserva;
