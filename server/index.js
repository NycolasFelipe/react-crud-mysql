import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "n4R$qMRVC#3!oo3cRQfW",
  database: "crud_store",
});

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { price } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO games ( name, price, category ) VALUES ( ?, ?, ? )";

  db.query(SQL, [name, price, category], (err, result) => {
    if (err) console.log(err);
    else res.send(result)
  });
});

app.get("/get-cards", (req, res) => {
  let SQL = "SELECT * from games";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
})

app.get("/", (req, res) => {
  res.send("Hello Homepage")
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { price } = req.body;
  const { category } = req.body;

  let SQL = "UPDATE games SET name = ?, price = ?, category = ? WHERE idgames = ?";
  db.query(SQL, [name, price, category, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
})

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM games WHERE idgames = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
})