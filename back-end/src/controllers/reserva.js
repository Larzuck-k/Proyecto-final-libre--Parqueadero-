import Reserva from '../models/reserva.js';

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    try {
      const { id_cliente_contratista, id_espacio, fin_reserva, estado } =
        req.body;
      // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
      const offset = -5; // Offset en horas para America/Bogota
      const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);
      localNow.setTime(localNow.getTime() + 15 * 60 * 1000); // Sumar 15 minutos
      const nuevaReserva = await Reserva.create({
        id_cliente_contratista,
        id_espacio,
        fin_reserva: localNow,
        estado,
      });
      res.status(200).send({
        status: "success",
        mensaje: "Reserva creada exitosamente",
        reserva: nuevaReserva,
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
        const reserva = await Reserva.findAll();
        if (reserva.length === 0) {
            const columnNames = Object.keys(Reserva.getAttributes());
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
            res.status(200).send(reserva);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los reserva: " + error
        });
    }
};

export default Reserva