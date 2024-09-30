import { Op } from "sequelize";
import ClienteNormal from "../models/cliente_normal.js";
import Contratista from "../models/contratista.js";

// Obtener todos los clientes normales
export const obtenerCliente_Contratista = async (req, res, next) => {
  try {
    // Realizar la consulta con la inclusión
    const data = await ClienteNormal.findAll({
      where: { nombre: { [Op.like]: `%${req.params.parametro}%` } },
    });
    const data2 = await Contratista.findAll({
      where: { nombre: { [Op.like]: `%${req.params.parametro}%` } },
    });

    if (data.length === 0 && data2.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send({ clientes: data, contratistas: data2 });
    }
  } catch (error) {
    next(error);
  }
};

export default ClienteNormal;
