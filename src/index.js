const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

async function getConnection() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USERDB,
        password: process.env.PASS,
        database: process.env.DB,
    });
    connection.connect();
    return connection;
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

//Obtengo todo el listado 
app.get("/animales", async (req, res) => {
    let query = "SELECT * FROM animales";
    const conn = await getConnection();
    const [results] = await conn.query(query);
    const numOfElements = results.length;
    res.json({
        info: { count: numOfElements }, // número de elementos
        results: results, // listado
    });
    conn.end();
});

//Inserto una entrada en mi unica entidad
app.post("/animales", async (req, res) => {
    const dataAnimal = req.body; //objeto
    const { idAnimal, nombre, raza, edad, tipo } = dataAnimal;
    let sql = "INSERT INTO animales(idAnimal, nombre, raza, edad, tipo) VALUES (?, ?, ?, ?, ?);";
    try {
        const conn = await getConnection();
        const [results] = await conn.query(sql, [
            idAnimal, 
            nombre, 
            raza, 
            edad, 
            tipo
        ]);
        if (results.affectedRows === 0) {
            res.json({
                success: false,
                message: "No se ha podido insertar",
            });
            return;
        }
        res.json({
            success: true,
            id: results.insertId, // id que generó MySQL para la nueva fila
        });
        conn.end();
    } catch (error) {
        res.json({
            success: false,
            message: `Ha ocurrido un error${error}`,
        });
    }
});
//Actualizo una entrada
app.put("/animales/:id", async (req, res) => {
    const dataAnimal = req.body; //objeto
    const { nombre, raza, edad, tipo } = dataAnimal;
    const animalId = req.params.id;
    let sql = "UPDATE animales SET nombre=?, raza=?, edad=?, tipo=? WHERE idAnimal= ?;";
    const conn = await getConnection();
    const [results] = await conn.query(sql, [
        nombre, 
        raza, 
        edad, 
        tipo,
        animalId
    ]);
    res.json({
      success: true,
      message: "Actualizado correctamente",
    });
    conn.end();
  });

  // Elimino una entrada 
  app.delete("/animales/:id", async (req, res) => {
    const animalId = req.params.id;
    let sql = "DELETE FROM animales WHERE idAnimal= ? ";
    const conn = await getConnection();
    const [results] = await conn.query(sql, [animalId]);
    res.json({
      success: true,
      message: "Eliminado correctamente",
    });
  });
  