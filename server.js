const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { WebSocketServer } = require("ws");

app.use(cors());
app.use(express.json());

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Babylon.js connected");
});

app.post("/sendCommand", (req, res) => {
    const command = req.body;
    console.log("Received command:", command);

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(command));
        }
    });

    res.json({ status: "ok", message: "Command sent to Babylon.js" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
