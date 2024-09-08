
import contratosModel from '../models/contratos.js';
import Contrato from "../models/contrato.js";

// Crear un nuevo contrato
export const crearContrato = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, id_cliente_contratista,id_contratos, id_espacio } = req.body;
        const nuevoContrato = await Contrato.create({
            fecha_inicio,
            fecha_fin,
            id_cliente_contratista,
            id_contratos,
            id_espacio
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
      const { id } = req.body;
      const contrato = await Contrato.findByPk(id);
  
      if (contrato) {
        const estadoActual = contrato.estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        contrato.estado = nuevoEstado;
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
        const contratos = await Contrato.findAll({
          include: {
            model: contratosModel,
            attributes: ["valor", "tipo", "tiempo"],
            as: "Contratos",
          },
        });
        if (contratos.length === 0) {
            const columnNames = Object.keys(Contrato.getAttributes());
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
            res.status(200).send(contratos);
        }
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
        const { fecha_inicio, fecha_fin, id_cliente_contratista,id_contratos,id_espacio } = req.body;
        const contrato = await Contrato.findByPk(id);

        if (contrato) {
            contrato.fecha_inicio = fecha_inicio || contrato.fecha_inicio;
            contrato.fecha_fin = fecha_fin || contrato.fecha_fin;
            contrato.id_contratos = id_contratos || contrato.id_contratos;
            contrato.id_cliente_contratista = id_cliente_contratista || contrato.id_cliente_contratista;
            contrato.id_espacio = id_espacio || contrato.id_espacio;
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