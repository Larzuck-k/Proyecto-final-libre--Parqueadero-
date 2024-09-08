import Reserva from '../models/reserva.js';
import reserva from '../routes/reserva.js';

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    try {
        const { id_cliente_contratista,id_espacio,fin_reserva,estado} = req.body;
        const nuevaReserva = await Reserva.create({
            id_cliente_contratista,
            id_espacio,
            fin_reserva,
            estado
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

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const reserva = await Reserva.findByPk(id);
  
      if (reserva) {
        const estadoActual = reserva.estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        reserva.estado = nuevoEstado;
        await reserva.save();
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

// // Actualizar una reserva
// export const actualizarReserva = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { id, Fecha_Hora_Fin, Monto_Pagado, ID_Cliente, ID_Espacio } = req.body;
//         const reserva = await Reserva.findByPk(id);

//         if (reserva) {
//             reserva.Fecha_Hora_Inicio = Fecha_Hora_Inicio || reserva.Fecha_Hora_Inicio;
//             reserva.Fecha_Hora_Fin = Fecha_Hora_Fin || reserva.Fecha_Hora_Fin;
//             reserva.Monto_Pagado = Monto_Pagado || reserva.Monto_Pagado;
//             reserva.ID_Cliente = ID_Cliente || reserva.ID_Cliente;
//             reserva.ID_Espacio = ID_Espacio || reserva.ID_Espacio;

//             await reserva.save();
//             res.status(200).send({
//                 status: "success",
//                 mensaje: "Reserva actualizada exitosamente",
//                 reserva
//             });
//         } else {
//             res.status(404).send({
//                 status: "error",
//                 mensaje: "Reserva no encontrada"
//             });
//         }
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             mensaje: "Error al actualizar la reserva: " + error
//         });
//     }
// };

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