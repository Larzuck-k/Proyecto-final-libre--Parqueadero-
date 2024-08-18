import DetalleFactura from '../models/detalleFactura.js';
import detallefactura from '../routes/detallefactura.js';

// Crear un nuevo detalle de factura
export const crearDetalleFactura = async (req, res) => {
    try {
        const { ID_Factura, ID_Espacio, Monto } = req.body;
        const nuevoDetalle = await DetalleFactura.create({
            ID_Factura,
            ID_Espacio,
            Monto
        });
        res.status(200).send({
            status: "success",
            mensaje: "Detalle de factura creado exitosamente",
            detalleFactura: nuevoDetalle
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el detalle de factura: " + error
        });
    }
};

// Obtener todos los detalles de factura
export const obtenerDetallesFactura = async (req, res) => {
    try {
        const detallesFactura = await DetalleFactura.findAll();
        res.status(200).send(detallesFactura);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los detalles de factura: " + error
        });
    }
};

// Actualizar un detalle de factura
export const actualizarDetalleFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Factura, ID_Espacio, Monto } = req.body;
        const detalleFactura = await DetalleFactura.findByPk(id);

        if (detalleFactura) {
            detalleFactura.ID_Factura = ID_Factura || detalleFactura.ID_Factura;
            detalleFactura.ID_Espacio = ID_Espacio || detalleFactura.ID_Espacio;
            detalleFactura.Monto = Monto || detalleFactura.Monto;
            await detalleFactura.save();
            res.status(200).send({
                status: "success",
                mensaje: "Detalle de factura actualizado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Detalle de factura no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el detalle de factura: " + error
        });
    }
};

// Eliminar un detalle de factura
export const eliminarDetalleFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const detalleFactura = await DetalleFactura.findByPk(id);

        if (detalleFactura) {
            await detalleFactura.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Detalle de factura eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Detalle de factura no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el detalle de factura: " + error
        });
    }
};
export default DetalleFactura