import DetalleFactura from '../models/detalleFactura.js';

// Crear un nuevo detalle de factura
export const crearDetalleFactura = async (req, res) => {
    try {
        const { id_factura, id_espacio, monto } = req.body;
        const nuevoDetalle = await DetalleFactura.create({
            id_factura,
            id_espacio,
            monto
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
        const { id_factura, id_espacio, monto } = req.body;
        const detalleFactura = await DetalleFactura.findByPk(id);

        if (detalleFactura) {
            detalleFactura.id_factura = id_factura || detalleFactura.id_factura;
            detalleFactura.id_espacio = id_espacio || detalleFactura.id_espacio;
            detalleFactura.monto = monto || detalleFactura.monto;
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