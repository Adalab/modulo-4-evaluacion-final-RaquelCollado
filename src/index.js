//imports
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//arrancar el servidor
const app = express();

//configurar
app.use(cors());
app.use(express.json());

//conexión a la bases de datos
async function getConnection() {
  //creary configurar la conexion
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "",
  });

  connection.connect();
  return connection;
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

//Endpoints