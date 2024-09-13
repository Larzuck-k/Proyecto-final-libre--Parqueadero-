import Tipo_Ocupacion from '../models/tipo_ocupacion.js';

// Crear un nuevo espacio
export const crearTipo_Ocupacion = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const nuevoTipoOcupacion = await Tipo_Ocupacion.create({
            descripcion
        });
        res.status(200).send({
          status: "success",
          mensaje: "Tipo de ocupación creado exitosamente",
          tipo_ocupacion: nuevoTipoOcupacion,
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el tipo de ocupación: " + error
        });
    }
};

// Obtener todos los espacios
export const obtenerTipo_Ocupacion = async (req, res) => {
    try {
        const tipoOcupacion = await Tipo_Ocupacion.findAll();
        if (tipoOcupacion.length === 0) {
          const columnNames = Object.keys(Tipo_Ocupacion.getAttributes());
          const emptyObject = columnNames.reduce(
            (acc, curr) => ({ ...acc, [curr]: "" }),
            {}
          );
          res.status(200).send([emptyObject]);
        } else {
          res.status(200).send(tipoOcupacion);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los tipos de ocupación: " + error
        });
    }
};


// Actualizar un espacio
export const actualizarTipo_Ocupacion = async (req, res) => {
    try {
        const { id } = req.body;
        const { descripcion } = req.body;
        const tipoOcupacion = await Tipo_Ocupacion.findByPk(id);
      console.log(id);
        if (tipoOcupacion) {
          tipoOcupacion.descripcion = descripcion || tipoOcupacion.descripcion;
          await tipoOcupacion.save();
          res.status(200).send({
            status: "success",
            mensaje: "Tipo de ocupación actualizado exitosamente",
            tipo_ocupacion: tipoOcupacion,
          });
        } else {
          res.status(404).send({
            status: "error",
            mensaje: "Tipo de ocupación no encontrado",
          });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el tipo de ocupación: " + error
        });
    }
};

export default Tipo_Ocupacion