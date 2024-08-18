import Contratista from '../models/contratista.js';
import contratista from '../routes/contratista.js';

// Crear un nuevo contratista
export const crearContratista = async (req, res) => {
    try {
        const { Nombre, Email, Teléfono, Fecha_Inicio_Contrato, Fecha_Fin_Contrato, ID_Administrador } = req.body;
        const nuevoContratista = await Contratista.create({
            Nombre,
            Email,
            Teléfono,
            Fecha_Inicio_Contrato,
            Fecha_Fin_Contrato,
            ID_Administrador
        });
        res.status(200).send({
            status: "success",
            mensaje: "Contratista creado exitosamente",
            contratista: nuevoContratista
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el contratista: " + error
        });
    }
};

// Obtener todos los contratistas
export const obtenerContratistas = async (req, res) => {
    try {
        const contratistas = await Contratista.findAll();
        res.status(200).send(contratistas);
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los contratistas: " + error
        });
    }
};

// Actualizar un contratista
export const actualizarContratista = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Email, Teléfono, Fecha_Inicio_Contrato, Fecha_Fin_Contrato, ID_Administrador } = req.body;
        const contratista = await Contratista.findByPk(id);

        if (contratista) {
            contratista.Nombre = Nombre || contratista.Nombre;
            contratista.Email = Email || contratista.Email;
            contratista.Teléfono = Teléfono || contratista.Teléfono;
            contratista.Fecha_Inicio_Contrato = Fecha_Inicio_Contrato || contratista.Fecha_Inicio_Contrato;
            contratista.Fecha_Fin_Contrato = Fecha_Fin_Contrato || contratista.Fecha_Fin_Contrato;
            contratista.ID_Administrador = ID_Administrador || contratista.ID_Administrador;
            await contratista.save();
            res.status(200).send({
                status: "success",
                mensaje: "Contratista actualizado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Contratista no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el contratista: " + error
        });
    }
};

// Eliminar un contratista
export const eliminarContratista = async (req, res) => {
    try {
        const { id } = req.params;
        const contratista = await Contratista.findByPk(id);

        if (contratista) {
            await contratista.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Contratista eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Contratista no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el contratista: " + error
        });
    }
};
export default Contratista