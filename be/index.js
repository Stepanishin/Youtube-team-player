const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

// Пользовательская очередь
let userQueue = [];
// Количество подключенных пользователей
let connectedUsers = 0;

// Дефолтная очередь
let DEFAULT_VIDEOS = [
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
];

let RECENTLY_PLAYED = [];

// return shuffled array
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Функция перемешивания элементов массива (кроме первого)
function shuffleExceptFirst(array) {
  const firstElement = array[0];
  const restElements = array.slice(1);

  for (let i = restElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [restElements[i], restElements[j]] = [restElements[j], restElements[i]];
  }

  return [firstElement, ...restElements];
}

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  connectedUsers++;
  io.emit("getUsersCount", connectedUsers);

  // if (userQueue.length > 1) {
  //   socket.emit("updateQueue", [...userQueue]);
  // } else {
  //   socket.emit("updateQueue", [...userQueue, ...DEFAULT_VIDEOS]);
  // }

  // Sending the current queue to the newly connected user
  socket.emit("updateQueue", [...userQueue]);

  socket.on("addVideo", (video) => {
    // Проверка на существование видео в очереди
    if (userQueue.some((v) => v.id === video.id)) {
      socket.emit("videoExists", "This video is already in the queue!"); // Отправить сообщение об ошибке клиенту
      return;
    }

    userQueue.push(video);

    // Добавление видео в DEFAULT_VIDEOS, если его там нет
    // if (!DEFAULT_VIDEOS.some((v) => v.id === video.id)) {
    //   DEFAULT_VIDEOS.push(video);
    // }

    // if (userQueue.length > 0) {
    //   io.emit("updateQueue", [...userQueue]);
    // } else {
    //   io.emit("updateQueue", [...userQueue, ...DEFAULT_VIDEOS]);
    // }

    // Рассылка обновленной очереди всем подключенным пользователям
    io.emit("updateQueue", [...userQueue]);

    socket.emit("videoAdded");
  });

  // Обработчик события удаления видео из очереди запущенного администратором
  socket.on("removeVideo", (video) => {
    userQueue = userQueue.filter((v) => v.id !== video.id);
    // DEFAULT_VIDEOS = DEFAULT_VIDEOS.filter((v) => v.id !== videoId); // Удаляю нужное видео из дефолтной очереди

    // if (userQueue.length > 1) {
    //   io.emit("updateQueue", [...userQueue]);
    // } else {
    //   io.emit("updateQueue", [...userQueue, ...DEFAULT_VIDEOS]);
    // }

    // Рассылка обновленной очереди всем подключенным пользователям
    io.emit("updateQueue", [...userQueue]);
  });

  // Обработчик события удаления видео из очереди после его окончания
  socket.on("removeVideoBySwitching", (video) => {
    if (!RECENTLY_PLAYED.some((v) => v.id === video.id)) {
      RECENTLY_PLAYED.push(video);
    }

    userQueue = userQueue.filter((v) => {
      return v.id !== video.id;
    });

    // если в очереди остался всего один элемент, то добавляем в очеред все элементы из RECENTLY_PLAYED, кроме того что уже есть в очереди, предварительно перемешав RECENTLY_PLAYED
    if (userQueue.length === 1) {
      const recentlyPlayedWithoutCurrent = RECENTLY_PLAYED.filter(
        (v) => v.id !== userQueue[0].id
      );
      const shuffledRecentlyPlayedWithoutCurrent = shuffleArray(
        recentlyPlayedWithoutCurrent
      );
      userQueue = [...userQueue, ...shuffledRecentlyPlayedWithoutCurrent];
      RECENTLY_PLAYED = [];
    }

    // Переход к проигрыванию DEFAULT_VIDEOS, если userQueue пуст
    // if (userQueue.length === 0) {
    //   userQueue = [...DEFAULT_VIDEOS]; // Копируем DEFAULT_VIDEOS в userQueue
    // }

    // if (userQueue.length > 0) {
    //   io.emit("updateQueue", [...userQueue]);
    // } else {
    //   io.emit("updateQueue", [...userQueue, ...DEFAULT_VIDEOS]);
    // }

    // Рассылка обновленной очереди всем подключенным пользователям
    io.emit("updateQueue", [...userQueue]);
  });

  socket.on("togglePlayPause", (isPlaying) => {
    // Рассылка состояния проигрывания всем подключенным пользователям
    // io.emit("setPlayPause", isPlaying);
  });

  socket.on("shuffleVideoList", () => {
    if (userQueue.length > 1) {
      userQueue = shuffleExceptFirst(userQueue);
      io.emit("updateQueue", [...userQueue]);
    } else {
      io.emit("updateQueue", [...DEFAULT_VIDEOS]);
    }
  });

  socket.on("updateQueueByDragAndDrop", (newQueue) => {
    userQueue = newQueue;
    io.emit("updateQueue", [...userQueue]);
  });

  socket.on("disconnect", () => {
    connectedUsers--;
    io.emit("getUsersCount", connectedUsers);
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
  role: String,
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
  const { email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, role });
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
