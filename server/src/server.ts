import express from "express";

const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
    console.log("acessou a rota");

    res.json({"derp": 1});
})

app.listen(3333)
