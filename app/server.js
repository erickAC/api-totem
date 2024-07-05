const pg = require('pg');

const { Client } = pg;
const client = new Client({
    ssl: true,
    user: 'default',
    password: 'L3fJFklOZ9PY',
    host: 'ep-gentle-glitter-a40cm62w.us-east-1.aws.neon.tech',
    port: 5432,
    database: 'verceldb',
});
client.connect();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.post(('/salvar/:tipo/:id'), async (req, res) => {
    var id = req.params.id;
    let query;
    if (req.params.tipo == "bom") {
        query = "UPDATE avaliacao SET bom = bom + 1 WHERE id = $1";
    }
    if (req.params.tipo == "regular") {
        query = "UPDATE avaliacao SET regular = regular + 1 WHERE id = $1";
    }
    if (req.params.tipo == "otimo") {
        query = "UPDATE avaliacao SET otimo = otimo + 1 WHERE id = $1";
    }
    await client.query(query, [id]).then(() => console.log("rodou")).catch((e) => console.log(e));
    res.status(201);
    res.send("Deu bom");
});

app.listen(8080, () => {
    console.log("Rodando o servidor")
});