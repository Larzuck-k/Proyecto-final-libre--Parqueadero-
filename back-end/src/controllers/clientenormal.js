import ClienteNormal from "../models/cliente_normal.js";

// Crear un nuevo cliente normal
export const crearClienteNormal = async (req, res) => {
  try {
    const { Nombre, Email, Teléfono } = req.body;
    const nuevoCliente = await ClienteNormal.create({
      Nombre,
      Email,
      Teléfono,
    });
    res.status(200).send({
      status: "success",
      mensaje: "Cliente creado exitosamente",
      cliente: nuevoCliente,
    });
  } catch (error) {
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
    console.log(id);
    const cliente = await ClienteNormal.findByPk(id);

    if (cliente) {
      const estadoActual = cliente.Estado;
      const nuevoEstado = estadoActual === 0 ? 1 : 0;
      cliente.Estado = nuevoEstado;
      await cliente.save();
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
    const clientes = await ClienteNormal.findAll();
    res.status(200).send(clientes);
  } catch (error) {
    res.status(400).send({
      status: "error",
      mensaje: "Error al obtener los clientes: " + error,
    });
  }
};

// Actualizar un cliente normal
export const actualizarClienteNormal = async (req, res) => {
  try {
    const { ID } = req.body;
    const { Nombre, Email, Teléfono } = req.body;
    const cliente = await ClienteNormal.findByPk(ID);

    if (cliente) {
      cliente.Nombre = Nombre || cliente.Nombre;
      cliente.Email = Email || cliente.Email;
      cliente.Teléfono = Teléfono || cliente.Teléfono;
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
