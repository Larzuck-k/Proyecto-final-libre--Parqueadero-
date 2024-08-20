import Factura from '../models/factura.js';

// Crear una nueva factura
export const crearFactura = async (req, res) => {
    try {
        const { Fecha_Emisión, Monto_Total, ID_Cliente, ID_Contratista, ID_Reserva, ID_Contrato } = req.body;
        const nuevaFactura = await Factura.create({
            Fecha_Emisión,
            Monto_Total,
            ID_Cliente,
            ID_Contratista,
            ID_Reserva,
            ID_Contrato
        });
        res.status(200).send({
            status: "success",
            mensaje: "Factura creada exitosamente",
            factura: nuevaFactura
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear la factura: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const factura = await Factura.findByPk(id);
  
      if (factura) {
        const estadoActual = factura.Estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        factura.Estado = nuevoEstado;
        await factura.save();
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


// Obtener todas las facturas
export const obtenerFacturas = async (req, res) => {
    try {
        const facturas = await Factura.findAll();
        res.status(200).send(facturas);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener las facturas: " + error
        });
    }
};

// Actualizar una factura
export const actualizarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha_Emisión, Monto_Total, ID_Cliente, ID_Contratista, ID_Reserva, ID_Contrato } = req.body;
        const factura = await Factura.findByPk(id);

        if (factura) {
            factura.Fecha_Emisión = Fecha_Emisión || factura.Fecha_Emisión;
            factura.Monto_Total = Monto_Total || factura.Monto_Total;
            factura.ID_Cliente = ID_Cliente || factura.ID_Cliente;
            factura.ID_Contratista = ID_Contratista || factura.ID_Contratista;
            factura.ID_Reserva = ID_Reserva || factura.ID_Reserva;
            factura.ID_Contrato = ID_Contrato || factura.ID_Contrato;
            await factura.save();
            res.status(200).send({
                status: "success",
                mensaje: "Factura actualizada exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Factura no encontrada"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar la factura: " + error
        });
    }
};

// Eliminar una factura
export const eliminarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const factura = await Factura.findByPk(id);

        if (factura) {
            await factura.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Factura eliminada exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Factura no encontrada"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar la factura: " + error
        });
    }
};
export default Factura