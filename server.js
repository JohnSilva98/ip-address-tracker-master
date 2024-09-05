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
  const apiKey = process.env.API_KEY;
  const ipAddress = req.query.ipAddress || "";
  const plan = "country,city"; // Ajuste o plano conforme necessário
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar dados", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
