import Espacio from '../models/espacio.js';
import tipo_ocupacion from '../models/tipo_ocupacion.js';

// Crear un nuevo espacio
export const crearEspacio = async (req, res) => {
    try {
        const { numero, id_tipo_ocupacion, id_parqueadero,estado } = req.body;
        const nuevoEspacio = await Espacio.create({
            numero,
            id_tipo_ocupacion,
            id_parqueadero,
            estado
        });
        res.status(200).send({
            status: "success",
            mensaje: "Espacio creado exitosamente",
            espacio: nuevoEspacio
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el espacio: " + error
        });
    }
};

// Obtener todos los espacios
export const obtenerEspacios = async (req, res) => {
    try {
        const espacio = await Espacio.findAll({include:{model:tipo_ocupacion,attributes:["descripcion"]}});
        console.log(espacio);
        if (espacio.length === 0) {
            const columnNames = Object.keys(Espacio.getAttributes());
            columnNames.splice(3,0,'descripcion')
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
            res.status(200).send(espacio);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los espacio: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const espacio = await Espacio.findByPk(id);
  
      if (espacio) {
        const estadoActual = espacio.estado;
        const nuevoEstado = estadoActual === "Disponible" ? "Ocupado" : "Disponible";
        espacio.estado = nuevoEstado;
        await espacio.save();
        res.status(200).send({
          status: "success",
          mensaje: "Se ha actualizado el actualizado exitosamente"
        });
      } else {
        res.status(404).send({
          status: "error",
          mensaje: "Registro no encontrado"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Error al cambiar el estado: " + error
      });
    }
  };


// Actualizar un espacio
export const actualizarEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, tipo_ocupacion, id_parqueadero,estado } = req.body;
        const espacio = await Espacio.findByPk(id);

        if (espacio) {
            espacio.numero = numero || espacio.numero;
            espacio.tipo_ocupacion = tipo_ocupacion || espacio.tipo_ocupacion;
            espacio.id_parqueadero = id_parqueadero || espacio.id_parqueadero;
            espacio.estado = estado || espacio.estado;

            await espacio.save();
            res.status(200).send({
                status: "success",
                mensaje: "Espacio actualizado exitosamente",
                espacio
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Espacio no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el espacio: " + error
        });
    }
};

// Eliminar un espacio
export const eliminarEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const espacio = await Espacio.findByPk(id);

        if (espacio) {
            await espacio.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Espacio eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Espacio no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el espacio: " + error
        });
    }
};
export default Espacio