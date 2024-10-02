import Espacio from "../models/espacio.js";
import parqueadero from "../models/parqueadero.js";
import reserva from "../models/reserva.js";

// Crear un nuevo espacio
export const crearEspacio = async (req, res, next) => {
  try {
    const { numero, id_parqueadero } = req.body;
    const exists = await Espacio.findOne({ where: { numero, id_parqueadero } });
    if (exists) {
      return res.status(400).send({
        status: "error",
        mensaje: "El número de espacio ya existe en este parqueadero",
      });
    }
    const nuevoEspacio = await Espacio.create({
      numero,
      id_parqueadero,
      estado: "Disponible",
    });
    res.status(200).send({
      status: "success",
      mensaje: "Espacio creado exitosamente",
      espacio: nuevoEspacio,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener todos los espacios
export const obtenerEspacios = async (req, res, next) => {
  try {
    const espacio = await Espacio.findAll({
      include: [
        {
          model: parqueadero,
          attributes: ["nombre"],
          as: "parqueadero_table",
        },
      ],
    });
    if (espacio.length === 0) {
      const columnNames = Object.keys(Espacio.getAttributes());
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      // Transformar los datos para aplanar el objeto Cliente_Contratista_Cliente
      const transformedEspacios = espacio.map((espacio) => {
        // Convertir el cliente en un objeto simple
        const espacioData = espacio.toJSON();

        if (espacioData.parqueadero_table) {
          espacioData.parqueadero = espacioData.parqueadero_table.nombre;
          delete espacioData.parqueadero_table;
        }
        const { estado, ...rest } = espacioData;
        return { ...rest, estado };
      });
      res.status(200).send(transformedEspacios);
    }
  } catch (error) {
    next(error);
  }
};
export const obtenerEspaciosByParking = async (req, res, next) => {
  // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
  const now = new Date();
  const offset = -5; // Offset en horas para America/Bogota
  const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

  try {
    // Actualizar los espacios y reservas
    const reservas = await reserva.findAll({ where: { estado: 1 } });

    if (reservas) {
      for (const e of reservas) {
        if (new Date(e.fin_reserva).getTime() < localNow.getTime()) {
          // Actualiza la reserva si ha caducado
          await e.update({ estado: 0 });
          const espacio = await Espacio.findOne({
            where: { id: e.id_espacio },
          });
          if (espacio.estado == "Reservado") {
            await Espacio.update(
              { estado: "Disponible" }, // Valores a actualizar
              { where: { id: e.id_espacio } } // Condición para seleccionar el registro
            );
          }
        }
      }
    }
    const id = req.query.id;
    const espacio = await Espacio.findAll({
      where: {
        id_parqueadero: id, // Filtra por id_parqueadero
      },
      include: {
        model: reserva, // El modelo de reserva asociado
        as: "reserva_table", // Alias para la tabla reserva
        where: {
          estado: 1, // Solo reservas con estado activo
        },
        required: false, // Esto asegura que se traigan todos los espacios, incluso si no tienen una reserva activa
      },
      order: [["numero", "ASC"]],
    });
    if (espacio.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(espacio);
    }
  } catch (error) {
    next(error);
  }
};
export const cambiarEstado = async (req, res, next) => {
  try {
    const { id } = req.body;
    const espacio = await Espacio.findByPk(id);

    if (espacio) {
      const estadoActual = espacio.estado;
      const nuevoEstado =
        estadoActual === "Disponible" ? "Ocupado" : "Disponible";
      espacio.estado = nuevoEstado;
      await espacio.save();
      res.status(200).send({
        status: "success",
        mensaje: "Se ha actualizado el estado exitosamente",
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

// Actualizar un espacio
export const actualizarEspacio = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { numero, id_parqueadero, estado } = req.body;
    const espacio = await Espacio.findByPk(id);

    if (espacio) {
      espacio.numero = numero || espacio.numero;
      espacio.id_parqueadero = id_parqueadero || espacio.id_parqueadero;
      espacio.estado = estado || espacio.estado;

      await espacio.save();
      res.status(200).send({
        status: "success",
        mensaje: "Espacio actualizado exitosamente",
        espacio,
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Espacio no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default Espacio;
