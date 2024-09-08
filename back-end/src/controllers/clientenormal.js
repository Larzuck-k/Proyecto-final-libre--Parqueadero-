import Cliente_Contratista from "../models/cliente_contratista.js";
import ClienteNormal from "../models/cliente_normal.js";
import db from "../models/db.js";

// Crear un nuevo cliente normal
export const crearClienteNormal = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const { nombre, email, telefono,ultima_visita } = req.body; 
    const nuevoCliente = await ClienteNormal.create(
      {
        nombre,
        email,
        telefono,
        ultima_visita: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      { transaction }
    );
    const nuevoClienteId = nuevoCliente.id;

    // Crear la relación con la tabla Cliente_Contratista
    await Cliente_Contratista.create({
      id_cliente: nuevoClienteId,
      id_contratista: null,
      estado: 1,
    },{transaction});

    transaction.commit();
    res.status(200).send({
      status: "success",
      mensaje: "Cliente creado exitosamente",
      cliente: nuevoCliente,
    });
  } catch (error) {
    transaction.rollback();
    res.status(400).send({
      status: "error",
      mensaje: "Error al crear el cliente: " + error,
    });
  }
};

// Cambiar estado de un cliente normal
export const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.body;
    const cliente = await ClienteNormal.findByPk(id,{include:{model:Cliente_Contratista,attributes:["id","estado"],as:"Cliente_Contratista_Cliente"}});

    if (cliente && cliente.Cliente_Contratista_Cliente) {
      const clienteContratista = cliente.Cliente_Contratista_Cliente; // Asume que es un objeto, no un array
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
    res.status(400).send({
      status: "error",
      mensaje: "Error al cambiar el estado: " + error,
    });
  }
};

// Obtener todos los clientes normales
export const obtenerClientesNormales = async (req, res) => {
  try {
    // Realizar la consulta con la inclusión
    const clientes = await ClienteNormal.findAll({
      include: {
        model: Cliente_Contratista,
        attributes: ["estado"],
        as: "Cliente_Contratista_Cliente",
      },
    });

    if (clientes.length === 0) {
      // Si no hay clientes, devolver una fila vacía con el nuevo campo 'estado'
      const columnNames = Object.keys(ClienteNormal.getAttributes());
      columnNames.push("estado");
      const emptyObject = columnNames.reduce(
        (acc, curr) => ({ ...acc, [curr]: "" }),
        {}
      );
      res.status(200).send([emptyObject]);
    } else {
      // Transformar los datos para aplanar el objeto Cliente_Contratista_Cliente
      const transformedClientes = clientes.map((cliente) => {
        // Convertir el cliente en un objeto simple
        const clienteData = cliente.toJSON();

        // Extraer el estado y eliminar la propiedad anidada
        if (clienteData.Cliente_Contratista_Cliente) {
          clienteData.estado = clienteData.Cliente_Contratista_Cliente.estado;
          delete clienteData.Cliente_Contratista_Cliente;
        }

        return clienteData;
      });

      res.status(200).send(transformedClientes);
    }
  } catch (error) {
    res.status(400).send({
        status: "error",
        mensaje: "Error al obtener los clientes: " + error
    });
}
};

// Actualizar un cliente normal
export const actualizarClienteNormal = async (req, res) => {
  try {
    const { id } = req.body;
    const { nombre, email, telefono } = req.body;
    const cliente = await ClienteNormal.findByPk(id);

    if (cliente) {
      cliente.nombre = nombre || cliente.nombre;
      cliente.email = email || cliente.email;
      cliente.telefono = telefono || cliente.telefono;
      await cliente.save();
      res.status(200).send({
        status: "success",
        mensaje: "Cliente actualizado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Cliente no encontrado",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      mensaje: "Error al actualizar el cliente: " + error,
    });
  }
};

// Eliminar un cliente normal
export const eliminarClienteNormal = async (req, res) => {
  try {
    const { id } = req.body;
    const cliente = await ClienteNormal.findByPk(id);

    if (cliente) {
      await cliente.destroy();
      res.status(200).send({
        status: "success",
        mensaje: "Cliente eliminado exitosamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Cliente no encontrado",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      mensaje: "Error al eliminar el cliente: " + error,
    });
  }
};
export default ClienteNormal;
