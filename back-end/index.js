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
import cnx from "./src/models/db.js";
import cors from 'cors'


import bodyparser from "body-parser";

import dotenv from "dotenv";

dotenv.config({ path: "././.env" });

//creamos el server node
const app = express();

const port = process.env.PORT;
//app.use(cors());


cnx
  .sync({ force: false })
  .then(() => {
    console.log("sincronizacion ok!");
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
app.use(clientenormal);

app.server = app.listen(port, () => {
  console.log(`Server ejecutandose en ${port}...`);
});

// crud
