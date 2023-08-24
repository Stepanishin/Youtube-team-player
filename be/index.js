const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// app.use(cors());
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

// Пользовательская очередь
let userQueue = [];
// Количество подключенных пользователей
let connectedUsers = 0;

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
  console.log("New client connected", socket.id);
  const DEFAULT_VIDEOS = [
    {
      id: "TdrL3QxjyVw",
      title: "Lana Del Rey - Summertime Sadness",
      duration: "4:25",
      added: "default",
    },
    {
      id: "MiAoetOXKcY",
      title: "Lana Del Rey - Say Yes To Heaven ",
      duration: "3:29",
      added: "default",
    },
    {
      id: "Bag1gUxuU0g",
      title: "Lana Del Rey - Born To Die",
      duration: "4:46",
      added: "default",
    },
    {
      id: "o_1aF54DO60",
      title: "Lana Del Rey - Young and Beautiful",
      duration: "3:58",
      added: "default",
    },
    {
      id: "qolmz4FlnZ0",
      title: "Lana Del Rey - Doin' Time",
      duration: "4:25",
      added: "default",
    },
  ];

  let defaultQueue = shuffleArray(DEFAULT_VIDEOS);

  // Отправка объединенной очереди клиенту
  // socket.emit("updateQueue", [...userQueue, ...defaultQueue]);

  if (userQueue.length > 1) {
    console.log("userQueue1", userQueue);
    socket.emit("updateQueue", [...userQueue]);
  } else {
    console.log("userQueue2", userQueue);
    socket.emit("updateQueue", [...userQueue, ...defaultQueue]);
  }
  // socket.on("getVideoList", (isPlaying) => {
  //   // Рассылка состояния проигрывания всем подключенным пользователям
  //   io.emit("setPlayPause", isPlaying);
  // });

  socket.on("addVideo", (video) => {
    console.log("check1");
    console.log("addVideo", video);
    // Проверка на существование видео в очереди
    if (userQueue.some((v) => v.id === video.id)) {
      socket.emit("videoExists", "This video is already in the queue!"); // Отправить сообщение об ошибке клиенту
      return;
    }

    userQueue.push(video);
    console.log("userQueue", userQueue);

    if (userQueue.length > 1) {
      io.emit("updateQueue", [...userQueue]);
    } else {
      io.emit("updateQueue", [...userQueue, ...defaultQueue]);
    }
    // после успешного добавления видео
    socket.emit("videoAdded");
  });

  // Обработчик события удаления видео из очереди
  socket.on("removeVideo", (videoId) => {
    console.log("check2");
    userQueue = userQueue.filter((v) => v.id !== videoId);
    defaultQueue = defaultQueue.filter((v) => v.id !== videoId); // Удаляю нужное видео из дефолтной очереди

    if (userQueue.length > 1) {
      io.emit("updateQueue", [...userQueue]);
    } else {
      io.emit("updateQueue", [...userQueue, ...defaultQueue]);
    }
  });

  socket.on("togglePlayPause", (isPlaying) => {
    console.log("check3");
    // Рассылка состояния проигрывания всем подключенным пользователям
    io.emit("setPlayPause", isPlaying);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Подключение к MongoDB
mongoose.connect(
  "mongodb+srv://evgeniistepanishin:Rtyuehe74@cluster0.haz86tn.mongodb.net/evgeniistepanishin?retryWrites=true&w=majority&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  email: String,
  favoriteVideos: [
    {
      id: String,
      title: String,
      duration: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

app.post("/auth/google", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    res.status(200).send({ message: "Authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.post("/favorite/toggle", async (req, res) => {
  const { email, video } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Проверяем, есть ли видео уже в избранном
    const videoIndex = user.favoriteVideos.findIndex((v) => v.id === video.id);

    if (videoIndex >= 0) {
      // Удаляем видео из избранного, если оно там уже есть
      user.favoriteVideos.splice(videoIndex, 1);
      await user.save();
      return res
        .status(200)
        .send({ message: "Video removed from favorites", user });
    } else {
      // Добавляем видео в избранное, если его там нет
      user.favoriteVideos.push(video);
      await user.save();
      return res
        .status(200)
        .send({ message: "Video added to favorites", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.get("/favoriteList", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Google ID is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ favoriteVideos: user.favoriteVideos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
