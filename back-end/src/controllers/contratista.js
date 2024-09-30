import Cliente_Contratista from "../models/cliente_contratista.js";
import Contratista from "../models/contratista.js";
import db from "../models/db.js";

// Crear un nuevo contratista
export const crearContratista = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { nombre, email, telefono, id_usuario } = req.body;

    const nuevoContratista = await Contratista.create(
      {
        nombre,
        email,
        telefono,
        id_usuario,
      },
      { transaction }
    );
    const nuevoContratistaId = nuevoContratista.id;

    await Cliente_Contratista.create(
      {
        id_usuario: null,
        id_contratista: nuevoContratistaId,
        estado: 1,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).send({
      status: "success",
      mensaje: "Contratista creado exitosamente",
      contratista: nuevoContratista,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const cambiarEstado = async (req, res, next) => {
  try {
    const { id } = req.body;
    const contratista = await Contratista.findByPk(id, {
      include: {
        model: Cliente_Contratista,
        attributes: ["id", "estado"],
        as: "Cliente_Contratista_Contratista",
      },
    });

    if (contratista && contratista.Cliente_Contratista_Contratista) {
      const clienteContratista = contratista.Cliente_Contratista_Contratista; // Asume que es un objeto, no un array
      const estadoActual = clienteContratista.estado;
      const nuevoEstado = estadoActual === 0 ? 1 : 0;
      clienteContratista.estado = nuevoEstado;

      // Guardar los cambios en la tabla Cliente_Contratista
      console.log(clienteContratista);
      await clienteContratista.save();
      res.status(200).send({
        status: "success",
        mensaje: "Se ha actualizado el actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Registro no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Obtener todos los contratistas
export const obtenerContratistas = async (req, res, next) => {
  try {
    const contratistas = await Contratista.findAll({
      include: {
        model: Cliente_Contratista,
        attributes: ["estado"],
        as: "Cliente_Contratista_Contratista",
      },
    });

    if (contratistas.length === 0) {
      const columnNames = Object.keys(Contratista.getAttributes());
      columnNames.push("estado");
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      // Transformar los datos para aplanar el objeto Cliente_Contratista_Cliente
      const transformedContratistas = contratistas.map((contratista) => {
        // Convertir el cliente en un objeto simple
        const contratistaData = contratista.toJSON();

        // Extraer el estado y eliminar la propiedad anidada
        if (contratistaData.Cliente_Contratista_Contratista) {
          contratistaData.estado =
            contratistaData.Cliente_Contratista_Contratista.estado;
          delete contratistaData.Cliente_Contratista_Contratista;
        }
        return contratistaData;
      });
      res.status(200).send(transformedContratistas);
    }
  } catch (error) {
    next(error);
  }
};

// Actualizar un contratista
export const actualizarContratista = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { nombre, email, telefono, id_usuario } = req.body;
    const contratista = await Contratista.findByPk(id);

    if (contratista) {
      contratista.nombre = nombre || contratista.nombre;
      contratista.email = email || contratista.email;
      contratista.telefono = telefono || contratista.telefono;
      contratista.id_usuario = id_usuario || contratista.id_usuario;
      await contratista.save();
      res.status(200).send({
        status: "success",
        mensaje: "Contratista actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Contratista no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un contratista
export const eliminarContratista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contratista = await Contratista.findByPk(id);

    if (contratista) {
      await contratista.destroy();
      res.status(200).send({
        status: "success",
        mensaje: "Contratista eliminado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Contratista no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};
export default Contratista;
