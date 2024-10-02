import Reserva from "../models/reserva.js";
import db from "../models/db.js";
import espacio from "../models/espacio.js";

// Crear una nueva reserva
export const crearReserva = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    if (!req.body.placa) {
      req.body.placa = "NINGUNO";
    }
    const { id_espacio } = req.body;

    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

    // Sumar 15 minutos
    localNow.setTime(localNow.getTime() + 15 * 60 * 1000);
    // Crear una nueva reserva
    const nuevaReserva = await Reserva.create(
      {
        // Asignar el id encontrado
        id_espacio,
        placa: req.body.placa,
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

// Obtener todas las reservas
export const cambiarEstado = async (req, res, next) => {
  try {
    const id = req.query.id;
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(400).send({
        status: "error",
        mensaje: "No se encontró la reserva",
      });
    }

    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const condition =
      new Date(reserva.fin_reserva).getTime() < localNow.getTime();
    if (condition && req.query.status) {
      return res.status(200).send({
        status: "info",
        mensaje:
          "Este espacio ya se encuentra disponible, ninguna acción fue tomada",
      });
    }
    if (condition || req.query.status) {
      // Actualiza la reserva si ha caducado
      await reserva.update({ estado: 0 });
      const Espacio = await espacio.findOne({
        where: { id: reserva.id_espacio },
      });
      if (Espacio.estado == "Reservado") {
        await espacio.update(
          { estado: "Disponible" }, // Valores a actualizar
          { where: { id: reserva.id_espacio } } // Condición para seleccionar el registro
        );
        res.status(200).send({
          status: "info",
          mensaje: "Espacio número " + Espacio.numero + " disponible",
        });
      }
    } else {
      res.status(200).send({
        status: "info",
        mensaje:
          "Este espacio ya se encuentra disponible, ninguna acción fue tomada",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default Reserva;
