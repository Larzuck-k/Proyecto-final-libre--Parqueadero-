import Espacio from "./espacio.js";
import rol from "./rol.js";
import usuario from "./usuario.js";
import parqueadero from "./parqueadero.js";
import Reserva from "./reserva.js";
import Contratista from "./contratista.js";
import Factura_Contratista from "./factura_contratista.js";
import contrato from "./contrato.js";

// Definir la asociación uno a uno

usuario.belongsTo(rol, { foreignKey: "id_rol", as: "Rol" });

Espacio.belongsTo(parqueadero, {
  foreignKey: "id_parqueadero",
  as: "parqueadero_table",
});
Espacio.hasMany(Reserva, {
  foreignKey: "id_espacio",
  as: "reserva_table",
});

Contratista.belongsTo(usuario, {
  foreignKey: "id_usuario",
  as: "usuario_table",
});

Factura_Contratista.belongsTo(Contratista, {
  foreignKey: "id_contratista",
  as: "contratista_table",
});

contrato.belongsTo(Contratista, {
  foreignKey: "id_contratista",
  as: "contratista_contrato_table",
});
