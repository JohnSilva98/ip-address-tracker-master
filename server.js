import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // Importar cors

dotenv.config();

const app = express();
const port = 5500;

// Use o middleware cors
app.use(cors());

app.get("/api/", async (req, res) => {
  // const endpoint = req.params.endpoint;
  const apiKey = process.env.API_KEY;
  const url = `https://geo.ipify.org/api/v2/?apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
