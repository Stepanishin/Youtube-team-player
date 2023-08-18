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
    { id: "3tmd-ClpJxA", title: "Billie Eilish - Bad Guy" },
    { id: "kXYiU_JCYtU", title: "Linkin Park - In The End" },
    { id: "JwYX52BP2Sk", title: "Queen – Bohemian Rhapsody" },
    {
      id: "RgKAFK5djSk",
      title: "Wiz Khalifa - See You Again ft. Charlie Puth",
    },
    { id: "09R8_2nJtjg", title: "Maroon 5 - Sugar" },
    { id: "CevxZvSJLk8", title: "Katy Perry - Roar" },
    { id: "YQHsXMglC9A", title: "Adele - Rolling in the Deep" },
    { id: "fLexgOxsZu0", title: "Justin Bieber - Sorry" },
    { id: "ktvTqknDobU", title: "Rihanna - Diamonds" },
    { id: "QGJuMBdaqIw", title: "Madonna - Like A Prayer" },
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up" },
    { id: "eVTXPUF4Oz4", title: "The Beatles - Hey Jude" },
    { id: "IcrbM1l_BoI", title: "Avicii - Wake Me Up" },
    { id: "pRpeEdMmmQ0", title: "Shakira - Waka Waka" },
    { id: "YVkUvmDQ3HY", title: "Eminem - Lose Yourself" },
    { id: "fJ9rUzIMcZQ", title: "Queen – We Will Rock You" },
    { id: "450p7goxZqg", title: "John Legend - All of Me" },
    { id: "hLQl3WQQoQ0", title: "Adele - Someone Like You" },
    { id: "QK8mJJJvaes", title: "Miley Cyrus - Wrecking Ball" },
    { id: "2vjPBrBU-TM", title: "Taylor Swift - Shake It Off" },
    { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars" },
    { id: "C-dvTjK_07c", title: "Pharrell Williams - Happy" },
    { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You" },
    { id: "iD2rhdFRehU", title: "Coldplay - Yellow" },
    { id: "WpYeekQkAdc", title: "The Black Eyed Peas - Where Is The Love?" },
    { id: "Ri7-vnrJD3k", title: "Justin Timberlake - Can't Stop the Feeling" },
    { id: "0J2QdDbelmY", title: "The Weeknd - Blinding Lights" },
  ];

  let defaultQueue = shuffleArray(DEFAULT_VIDEOS);

  // Отправка объединенной очереди клиенту
  socket.emit("updateQueue", [...userQueue, ...defaultQueue]);

  socket.on("addVideo", (video) => {
    // Проверка на существование видео в очереди
    if (userQueue.some((v) => v.id === video.id)) return;

    userQueue.push(video);
    io.emit("updateQueue", [...userQueue, ...defaultQueue]);
  });

  // Обработчик события удаления видео из очереди
  socket.on("removeVideo", (videoId) => {
    userQueue = userQueue.filter((v) => v.id !== videoId);
    defaultQueue = defaultQueue.filter((v) => v.id !== videoId); // Удалите нужное видео из дефолтной очереди

    io.emit("updateQueue", [...userQueue, ...defaultQueue]);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
