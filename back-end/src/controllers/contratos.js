import Contrato from "../models/contratos.js";

// Crear un nuevo contrato
export const crearContrato = async (req, res) => {
    try {
        const {nombre,valor, tipo, tiempo} = req.body;
        const nuevoContrato = await Contrato.create({
            nombre,
            valor,
            tipo,
            tiempo,
        });
        res.status(200).send({
            status: "success",
            mensaje: "Tipo de contrato creado exitosamente",
            contrato: nuevoContrato
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el tipo de contrato: " + error
        });
    }
};

// Obtener todos los contratos
export const obtenerContratos = async (req, res) => {
    try {
        const contratos = await Contrato.findAll();
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
            mensaje: "Error al obtener los tipos de contratos: " + error
        });
    }
};

// Actualizar un contrato
export const actualizarContrato = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre,valor,tipo,tiempo } = req.body;
        const contrato = await Contrato.findByPk(id);

        if (contrato) {
            contrato.nombre = nombre || contrato.nombre;
            contrato.valor = valor || contrato.valor;
            contrato.tipo = tipo || contrato.tipo;
            contrato.tiempo = tiempo || contrato.tiempo;
            
            await contrato.save();
            res.status(200).send({
                status: "success",
                mensaje: "Tipo de contrato actualizado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Tipo de contrato no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el tipo de contrato: " + error
        });
    }
};

// Eliminar un contrato
// export const eliminarContrato = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const contrato = await Contrato.findByPk(id);

//         if (contrato) {
//             await contrato.destroy();
//             res.status(200).send({
//                 status: "success",
//                 mensaje: "Contrato eliminado exitosamente"
//             });
//         } else {
//             res.status(404).send({
//                 status: "error",
//                 mensaje: "Contrato no encontrado"
//             });
//         }
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             mensaje: "Error al eliminar el contrato: " + error
//         });
//     }
// };
export default Contrato