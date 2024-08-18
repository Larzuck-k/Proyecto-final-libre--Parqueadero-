import Reserva from '../models/reserva.js';
import reserva from '../routes/reserva.js';

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    try {
        const { Fecha_Hora_Inicio, Fecha_Hora_Fin, Monto_Pagado, ID_Cliente, ID_Espacio } = req.body;
        const nuevaReserva = await Reserva.create({
            Fecha_Hora_Inicio,
            Fecha_Hora_Fin,
            Monto_Pagado,
            ID_Cliente,
            ID_Espacio
        });
        res.status(200).send({
            status: "success",
            mensaje: "Reserva creada exitosamente",
            reserva: nuevaReserva
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear la reserva: " + error
        });
    }
};

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.status(200).send(reservas);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener las reservas: " + error
        });
    }
};

// Actualizar una reserva
export const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha_Hora_Inicio, Fecha_Hora_Fin, Monto_Pagado, ID_Cliente, ID_Espacio } = req.body;
        const reserva = await Reserva.findByPk(id);

        if (reserva) {
            reserva.Fecha_Hora_Inicio = Fecha_Hora_Inicio || reserva.Fecha_Hora_Inicio;
            reserva.Fecha_Hora_Fin = Fecha_Hora_Fin || reserva.Fecha_Hora_Fin;
            reserva.Monto_Pagado = Monto_Pagado || reserva.Monto_Pagado;
            reserva.ID_Cliente = ID_Cliente || reserva.ID_Cliente;
            reserva.ID_Espacio = ID_Espacio || reserva.ID_Espacio;

            await reserva.save();
            res.status(200).send({
                status: "success",
                mensaje: "Reserva actualizada exitosamente",
                reserva
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Reserva no encontrada"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar la reserva: " + error
        });
    }
};

// Eliminar una reserva
export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);

        if (reserva) {
            await reserva.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Reserva eliminada exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Reserva no encontrada"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar la reserva: " + error
        });
    }
};
export default Reserva