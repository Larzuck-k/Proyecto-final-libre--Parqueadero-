import express from "express";

import detallefactura from "./src/routes/detallefactura.js";
import espacio from "./src/routes/espacio.js";
import factura from "./src/routes/factura.js";
import parqueadero from "./src/routes/parqueadero.js";
import reserva from "./src/routes/reserva.js";
import rol from "./src/routes/rol.js";
import usuario from "./src/routes/usuario.js";
import clientenormal from "./src/routes/clientenormal.js";
import contratista from "./src/routes/contratista.js";
import contrato from "./src/routes/contrato.js";
import contratos from "./src/routes/contratos.js";
import cnx from "./src/models/db.js";
import cors from 'cors'

// Modelos
import "./src/models/cliente_contratista.js";
import "./src/models/cliente_normal.js";
import "./src/models/contratista.js";
import "./src/models/contrato.js";
import "./src/models/contratos.js";
import "./src/models/detalleFactura.js";
import "./src/models/espacio.js";
import "./src/models/factura.js";
import "./src/models/parqueadero.js";
import "./src/models/reserva.js";
import Rol from "./src/models/rol.js";
import "./src/models/tipo_ocupacion.js";
import "./src/models/usuario.js";
import "./src/models/zassociations.js";

import bodyparser from "body-parser";

import dotenv from "dotenv";

dotenv.config({ path: "././.env" });

//creamos el server node
const app = express();

const port = process.env.PORT;
//app.use(cors());


cnx
  .sync({ force: false })
  .then(async () => {
    console.log("sincronizacion ok!");
    if(await Rol.count() === 0){
       await Rol.bulkCreate([
         { id: 1, nombre: "Administrador" },
         { id: 2, nombre: "Manager" },
       ]);
       console.log("Roles creados exitosamente");
    }
   
  })
  .catch((error) => {
    console.log(error);
  });


  app.use(cors());

  app.use(bodyparser.urlencoded({extended: true}));
  app.use(bodyparser.json());


app.use(detallefactura);
app.use(espacio);
app.use(factura);
app.use(usuario);
app.use(parqueadero);
app.use(rol);
app.use(reserva);
app.use(contratista);
app.use(contrato);
app.use(contratos);
app.use(clientenormal);


app.server = app.listen(port, () => {
  console.log(`Server ejecutandose en ${port}...`);
});

// crud
