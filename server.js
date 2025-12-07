import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("WebSocket server running");
});

const server = app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  console.log("Client connected");

  ws.send(JSON.stringify({ info: "connected" }));

  ws.on("message", msg => {
    console.log("Message:", msg);
  });
});

export default app;


app.listen(3000, () => {
  console.log("API online su Render");
});

