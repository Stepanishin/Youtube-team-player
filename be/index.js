const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
    if (userQueue.some((v) => v.id === video.id)) {
      socket.emit("videoExists", "This video is already in the queue!"); // Отправить сообщение об ошибке клиенту
      return;
    }

    userQueue.push(video);

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

// Подключение к MongoDB
mongoose.connect(
  "mongodb+srv://evgeniistepanishin:Rtyuehe74@cluster0.haz86tn.mongodb.net/evgeniistepanishin?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  googleId: String,
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
  const { googleId } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId });
      await user.save();
    }

    // Здесь можно сгенерировать и отправить JWT или другой токен для аутентификации в вашем приложении, если это необходимо
    res.status(200).send({ message: "Authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.post("/favorite/toggle", async (req, res) => {
  const { googleId, video } = req.body;

  try {
    const user = await User.findOne({ googleId });
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

const port = 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
