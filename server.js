import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());

const wss = new WebSocketServer({ port: 8081 });

let connectedClients = [];

wss.on("connection", (ws) => {
  connectedClients.push(ws);

  ws.on("close", () => {
    connectedClients = connectedClients.filter((c) => c !== ws);
  });
});

app.post("/highlight", (req, res) => {
  const { mesh } = req.body;

  connectedClients.forEach((client) => {
    client.send(JSON.stringify({ action: "highlight", mesh }));
  });

  res.json({ status: "ok", sent: mesh });
});

app.listen(3000, () => {
  console.log("API online su Render");
});

