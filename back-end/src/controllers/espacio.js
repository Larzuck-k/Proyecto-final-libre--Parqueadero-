import Espacio from "../models/espacio.js";
import parqueadero from "../models/parqueadero.js";
import reserva from "../models/reserva.js";
import tipo_ocupacion from "../models/tipo_ocupacion.js";

// Crear un nuevo espacio
export const crearEspacio = async (req, res, next) => {
  try {
    const { numero, id_tipo_ocupacion, id_parqueadero } = req.body;
    const nuevoEspacio = await Espacio.create({
      numero,
      id_tipo_ocupacion,
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
          model: tipo_ocupacion,
          attributes: ["descripcion"],
          as: "Tipo_Ocupacion",
        },
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
        // Extraer el estado y eliminar la propiedad anidada
        if (espacioData.Tipo_Ocupacion) {
          espacioData.tipo_ocupacion = espacioData.Tipo_Ocupacion.descripcion;
          delete espacioData.Tipo_Ocupacion;
        }
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
        // Cambié a un bucle for...of para manejar mejor async/await
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
        id_parqueadero: id,
      },
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

// Actualizar un espacio
export const actualizarEspacio = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { numero, id_tipo_ocupacion, id_parqueadero, estado } = req.body;
    const espacio = await Espacio.findByPk(id);

    if (espacio) {
      espacio.numero = numero || espacio.numero;
      espacio.id_tipo_ocupacion =
        id_tipo_ocupacion || espacio.id_tipo_ocupacion;
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

// Eliminar un espacio
export const eliminarEspacio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const espacio = await Espacio.findByPk(id);

    if (espacio) {
      await espacio.destroy();
      res.status(200).send({
        status: "success",
        mensaje: "Espacio eliminado exitosamente",
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
