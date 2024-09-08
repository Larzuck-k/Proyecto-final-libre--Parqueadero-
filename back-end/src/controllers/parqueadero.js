import Parqueadero from '../models/parqueadero.js';

// Crear un nuevo parqueadero
export const crearParqueadero = async (req, res) => {
    try {
        const { nombre, ubicacion, id_usuario } = req.body;
        const nuevoParqueadero = await Parqueadero.create({
            nombre,
            ubicacion,
            id_usuario
        });
        res.status(200).send({
            status: "success",
            mensaje: "Parqueadero creado exitosamente",
            parqueadero: nuevoParqueadero
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el parqueadero: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const parqueadero = await Parqueadero.findByPk(id);
  
      if (parqueadero) {
        const estadoActual = parqueadero.estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        parqueadero.estado = nuevoEstado;
        await parqueadero.save();
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


// Obtener todos los parqueaderos
export const obtenerParqueaderos = async (req, res) => {
    try {
        const parqueaderos = await Parqueadero.findAll();
        if (parqueaderos.length === 0) {
            const columnNames = Object.keys(Parqueadero.getAttributes());
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
            res.status(200).send(parqueaderos);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los parqueaderos: " + error
        });
    }
};

// Actualizar un parqueadero
export const actualizarParqueadero = async (req, res) => {
    try {
        const { id } = req.body;
        const { nombre, ubicacion, id_usuario } = req.body;
        const parqueadero = await Parqueadero.findByPk(id);

        if (parqueadero) {
            parqueadero.nombre = nombre || parqueadero.nombre;
            parqueadero.ubicacion = ubicacion || parqueadero.ubicacion;
            parqueadero.id_usuario = id_usuario || parqueadero.id_usuario;

            await parqueadero.save();
            res.status(200).send({
                status: "success",
                mensaje: "Parqueadero actualizado exitosamente",
                parqueadero
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Parqueadero no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el parqueadero: " + error
        });
    }
};

// Eliminar un parqueadero
export const eliminarParqueadero = async (req, res) => {
    try {
        const { id } = req.body;
        const parqueadero = await Parqueadero.findByPk(id);

        if (parqueadero) {
            await parqueadero.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Parqueadero eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Parqueadero no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el parqueadero: " + error
        });
    }
};
export default Parqueadero