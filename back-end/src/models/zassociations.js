import Cliente from "./cliente_normal.js";
import Cliente_Contratista from "./cliente_contratista.js";
import Contratista from "./contratista.js";
import Espacio from "./espacio.js";
import tipo_ocupacion from "./tipo_ocupacion.js";
import Contrato from "../controllers/contrato.js";
import contratos from "./contratos.js";
import rol from "./rol.js";
import usuario from "./usuario.js";
// Definir la asociación uno a uno
Cliente.hasOne(Cliente_Contratista, {
  foreignKey: "id_cliente",
  as: "Cliente_Contratista_Cliente",
});
Cliente_Contratista.belongsTo(Cliente, {
  foreignKey: "id_cliente", as:"Cliente_Contratista_Cliente"
});
// Definir la asociación uno a uno
Contratista.hasOne(Cliente_Contratista, {
  foreignKey: "id_contratista", as:"Cliente_Contratista_Contratista"
});
Cliente_Contratista.belongsTo(Contratista, {
  foreignKey: "id_contratista",
  as: "Cliente_Contratista_Contratista",
});


// Definir la asociación uno a uno

Contrato.belongsTo(contratos, {
  foreignKey: "id_contratos",
  as:"Contratos"
});

usuario.belongsTo(rol,{foreignKey:"id_rol",as: "Rol"
})

Espacio.belongsTo(tipo_ocupacion, {
  foreignKey: "id_tipo_ocupacion",
  as: "Tipo_Ocupacion",
}); 