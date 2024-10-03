import { Op } from "sequelize";
import db from "../models/db.js";
import Detalle_Cliente from "../models/detalle_cliente.js";
import Espacio from "../models/espacio.js";
import reserva from "../models/reserva.js";

// Crear un nuevo contratista
export const CrearDetalleCliente = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { id_espacio, placa } = req.body;
    // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
    const now = new Date();
    const offset = -5; // Offset en horas para America/Bogota
    const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

    await Detalle_Cliente.create(
      { id_espacio, placa, hora_entrada: localNow },
      { transaction }
    );
    const espacio = await Espacio.findByPk(id_espacio, { transaction });

    if (!espacio) {
      transaction.rollback();
      res.status(400).send({
        status: "error",
        mensaje: "Espacio no encontrado",
      });
    }

    espacio.estado = "Ocupado";
    await espacio.save({ transaction });
    await reserva.update(
      { estado: 0 },
      {
        where: { [Op.and]: { id_espacio: id_espacio, estado: 1 } },
        transaction,
      }
    );
    transaction.commit();
    res.status(200).send({
      status: "success",
      mensaje: "Espacio ocupado correctamente",
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
export const ObtenerClientes = async (req, res, next) => {
  try {
    const clientes = await Detalle_Cliente.findAll();

    if (clientes.length === 0) {
      const columnNames = Object.keys(Detalle_Cliente.getAttributes());

      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );

      res.status(200).send([emptyObject]);
    } else {
      res.status(200).send(clientes);
    }
  } catch (error) {
    next(error);
  }
};

export default Detalle_Cliente;
