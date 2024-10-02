import Espacio from "./espacio.js";
import rol from "./rol.js";
import usuario from "./usuario.js";
import parqueadero from "./parqueadero.js";
import Reserva from "./reserva.js";

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
