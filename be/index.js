const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const registerSocketHandlers = require("./sockets/socketHandlers");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://fondinferiorroot.stepanishin.repl.co",
    "https://youtube-team-player.stepanishin.repl.co",
    "https://youtube-team-player.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://fondinferiorroot.stepanishin.repl.co",
      "https://youtube-team-player.stepanishin.repl.co",
      "https://youtube-team-player.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io);
});

// Connect Database
connectDB();

app.use("/auth", authRoutes);
app.use("", favoriteRoutes);

server.listen(3000, () => {
  console.log("listening on *:3000");
});
