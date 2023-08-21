const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Разрешить подключение с любого домена
    methods: ["GET", "POST"], // Разрешить методы, которые могут быть использованы в запросе
  },
});

// Пользовательская очередь
let userQueue = [];

// return shuffled array
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

io.on("connection", (socket) => {
  console.log("New client connected");
  const DEFAULT_VIDEOS = [
    {
      id: "TdrL3QxjyVw",
      title: "Lana Del Rey - Summertime Sadness",
      duration: "4:25",
    },
    {
      id: "MiAoetOXKcY",
      title: "Lana Del Rey - Say Yes To Heaven ",
      duration: "3:29",
    },
    {
      id: "Bag1gUxuU0g",
      title: "Lana Del Rey - Born To Die",
      duration: "4:46",
    },
    {
      id: "o_1aF54DO60",
      title: "Lana Del Rey - Young and Beautiful",
      duration: "3:58",
    },
    {
      id: "qolmz4FlnZ0",
      title: "Lana Del Rey - Doin' Time",
      duration: "4:25",
    },
  ];

  let defaultQueue = shuffleArray(DEFAULT_VIDEOS);

  // Отправка объединенной очереди клиенту
  socket.emit("updateQueue", [...userQueue, ...defaultQueue]);

  socket.on("addVideo", (video) => {
    // Проверка на существование видео в очереди
    if (userQueue.some((v) => v.id === video.id)) return;

    userQueue.push(video);

    if (userQueue.length > 1) {
      io.emit("updateQueue", [...userQueue]);
    } else {
      io.emit("updateQueue", [...userQueue, ...defaultQueue]);
    }
  });

  // Обработчик события удаления видео из очереди
  socket.on("removeVideo", (videoId) => {
    userQueue = userQueue.filter((v) => v.id !== videoId);
    defaultQueue = defaultQueue.filter((v) => v.id !== videoId); // Удаляю нужное видео из дефолтной очереди

    if (userQueue.length > 1) {
      io.emit("updateQueue", [...userQueue]);
    } else {
      io.emit("updateQueue", [...userQueue, ...defaultQueue]);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
