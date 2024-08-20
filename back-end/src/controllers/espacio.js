import Espacio from '../models/espacio.js';
import factura from './factura.js';

// Crear un nuevo espacio
export const crearEspacio = async (req, res) => {
    try {
        const { Número, Estado, Tipo_Ocupación, Fila, ID_Parqueadero } = req.body;
        const nuevoEspacio = await Espacio.create({
            Número,
            Estado,
            Tipo_Ocupación,
            Fila,
            ID_Parqueadero
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
        const espacios = await Espacio.findAll();
        res.status(200).send(espacios);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los espacios: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const espacio = await Espacio.findByPk(id);
  
      if (espacio) {
        const estadoActual = espacio.Estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        espacio.Estado = nuevoEstado;
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
        const { Número, Estado, Tipo_Ocupación, Fila, ID_Parqueadero } = req.body;
        const espacio = await Espacio.findByPk(id);

        if (espacio) {
            espacio.Número = Número || espacio.Número;
            espacio.Estado = Estado || espacio.Estado;
            espacio.Tipo_Ocupación = Tipo_Ocupación || espacio.Tipo_Ocupación;
            espacio.Fila = Fila || espacio.Fila;
            espacio.ID_Parqueadero = ID_Parqueadero || espacio.ID_Parqueadero;

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