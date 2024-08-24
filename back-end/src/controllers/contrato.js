import Contrato from '../models/contrato.js';
import contrato from '../routes/contrato.js';

// Crear un nuevo contrato
export const crearContrato = async (req, res) => {
    try {
        const { Fecha_Inicio, Fecha_Fin, Monto, ID_Contratista, ID_Espacio } = req.body;
        const nuevoContrato = await Contrato.create({
            Fecha_Inicio,
            Fecha_Fin,
            Monto,
            ID_Contratista,
            ID_Espacio
        });
        res.status(200).send({
            status: "success",
            mensaje: "Contrato creado exitosamente",
            contrato: nuevoContrato
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el contrato: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { ID } = req.body;
      const contrato = await Contrato.findByPk(ID);
  
      if (contrato) {
        const estadoActual = contrato.Estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        contrato.Estado = nuevoEstado;
        await contrato.save();
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


// Obtener todos los contratos
export const obtenerContratos = async (req, res) => {
    try {
        const contratos = await Contrato.findAll();
        res.status(200).send(contratos);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los contratos: " + error
        });
    }
};

// Actualizar un contrato
export const actualizarContrato = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha_Inicio, Fecha_Fin, Monto, ID_Contratista, ID_Espacio } = req.body;
        const contrato = await Contrato.findByPk(id);

        if (contrato) {
            contrato.Fecha_Inicio = Fecha_Inicio || contrato.Fecha_Inicio;
            contrato.Fecha_Fin = Fecha_Fin || contrato.Fecha_Fin;
            contrato.Monto = Monto || contrato.Monto;
            contrato.ID_Contratista = ID_Contratista || contrato.ID_Contratista;
            contrato.ID_Espacio = ID_Espacio || contrato.ID_Espacio;
            await contrato.save();
            res.status(200).send({
                status: "success",
                mensaje: "Contrato actualizado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Contrato no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el contrato: " + error
        });
    }
};

// Eliminar un contrato
export const eliminarContrato = async (req, res) => {
    try {
        const { id } = req.params;
        const contrato = await Contrato.findByPk(id);

        if (contrato) {
            await contrato.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Contrato eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Contrato no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el contrato: " + error
        });
    }
};
export default Contrato