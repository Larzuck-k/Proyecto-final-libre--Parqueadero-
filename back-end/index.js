import express from "express";

import espacio from "./src/routes/espacio.js";
import factura_contratista from "./src/routes/factura_contratista.js";
import factura_cliente from "./src/routes/factura_cliente.js";
import parqueadero from "./src/routes/parqueadero.js";
import reserva from "./src/routes/reserva.js";
import rol from "./src/routes/rol.js";
import usuario from "./src/routes/usuario.js";
import contratista from "./src/routes/contratista.js";
import contrato from "./src/routes/contrato.js";
import cnx from "./src/models/db.js";
import cors from "cors";
import Detalle_Cliente from "./src/routes/detalle_cliente.js";
// Modelos
import "./src/models/sessions.js";
import "./src/models/cache.js";
import "./src/models/cache_locks.js";
import Cliente from "./src/models/cliente.js";
import "./src/models/contratista.js";
import "./src/models/contrato.js";
import "./src/models/espacio.js";
import "./src/models/factura_contratista.js";
import "./src/models/factura_cliente.js";
import "./src/models/parqueadero.js";
import "./src/models/reserva.js";
import Rol from "./src/models/rol.js";
import "./src/models/usuario.js";
import "./src/models/detalle_cliente.js";
import "./src/models/zassociations.js";

// Middlewares
import errorHandleMiddleware from "./src/middlewares/errorHandleMiddleware.js";

import bodyparser from "body-parser";

import dotenv from "dotenv";
import validarDatos from "./src/middlewares/validarDatos.js";

dotenv.config({ path: "././.env" });

//creamos el server node
const app = express();

const port = process.env.PORT;
//app.use(cors());

cnx
  .sync({ force: false })
  .then(async () => {
    console.log("sincronizacion ok!");
    if ((await Rol.count()) === 0) {
      await Rol.bulkCreate([
        { id: 1, nombre: "Administrador" },
        { id: 2, nombre: "Manager" },
      ]);
      console.log("Roles creados exitosamente");
    }
    if ((await Cliente.count()) === 0) {
      await Cliente.create({ id: 9999, nombre: "Cliente Universal" });
      console.log("Roles creados exitosamente");
    }
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(validarDatos);
app.use(espacio);
app.use(factura_contratista);
app.use(factura_cliente);
app.use(usuario);
app.use(parqueadero);
app.use(rol);
app.use(reserva);
app.use(contratista);
app.use(contrato);
app.use(Detalle_Cliente);
app.use(errorHandleMiddleware);
app.server = app.listen(port, () => {
  console.log(`Server ejecutandose en ${port}...`);
});

// crud
