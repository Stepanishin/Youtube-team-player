const shuffleExceptFirst = require("../utils/shuffleExceptFirst");
const shuffleArray = require("../utils/shuffleArray");

let userQueue = [];
let RECENTLY_PLAYED = [];
let USERS = [];
let connectedUsers = 0;
// Start time of the current video
let currentVideoStartTime = Date.now();
// Duration of the current video in milliseconds
let currentVideoDuration = 0;

const updateCurrentVideoTime = () => {
  if (userQueue.length > 0) {
    currentVideoDuration = Date.now() - currentVideoStartTime;
  }
};

const resetCurrentVideoTime = () => {
  currentVideoStartTime = Date.now();
  currentVideoDuration = 0;
};

const registerSocketHandlers = (socket, io) => {
  connectedUsers++;
  io.emit("getUsersCount", connectedUsers);

  // Sending the current queue to the newly connected user
  socket.emit("updateQueue", [...userQueue]);
  socket.emit("updateRecentlyPlayedQueue", [...RECENTLY_PLAYED]);

  USERS.push({ id: socket.id, name: "Anonymous" });
  io.emit("getAllUsers", USERS);

  socket.on("userLogin", (email) => {
    // Find the user in the array and update his name
    const user = USERS.find((u) => u.id === socket.id);
    if (user) {
      user.name = email;
      // Send the updated list of users to all clients
      io.emit("getAllUsers", USERS);
    }
  });

  socket.on("addVideo", (video) => {
    // Check if the video is already in the queue
    if (userQueue.some((v) => v.id === video.id)) {
      socket.emit("videoExists", "This video is already in the queue!");
      return;
    }

    userQueue.push(video);

    // Check if user length === 1
    // In this case reset the current video time
    if (userQueue.length === 1) {
      resetCurrentVideoTime();
    }

    // Sending the updated queue to all connected users
    io.emit("updateQueue", [...userQueue]);

    socket.emit("videoAdded");
  });

  socket.on("removeVideo", (video) => {
    userQueue = userQueue.filter((v) => v.id !== video.id);

    // Sending the updated queue to all connected users
    io.emit("updateQueue", [...userQueue]);
  });

  socket.on("removeVideoBySwitching", (video) => {
    if (!RECENTLY_PLAYED.some((v) => v.id === video.id)) {
      RECENTLY_PLAYED.push(video);
    }

    userQueue = userQueue.filter((v) => {
      return v.id !== video.id;
    });

    // if in queue there is only one element left, then we add to the queue all the elements from RECENTLY_PLAYED,
    // except for what is already in the queue, after shuffling RECENTLY_PLAYED
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

    // Resetting the current video time
    resetCurrentVideoTime();
    // Sending the updated queue to all connected users
    io.emit("updateQueue", [...userQueue]);
    io.emit("updateRecentlyPlayedQueue", [...RECENTLY_PLAYED]);
  });

  socket.on("shuffleVideoList", () => {
    if (userQueue.length > 1) {
      userQueue = shuffleExceptFirst(userQueue);
      io.emit("updateQueue", [...userQueue]);
    }
  });

  socket.on("updateQueueByDragAndDrop", (newQueue) => {
    userQueue = newQueue;
    io.emit("updateQueue", [...userQueue]);
  });

  socket.on("nextSong", () => {
    if (userQueue.length > 1) {
      // The second element in the queue becomes the next one
      const nextVideo = userQueue[0];

      // Processing logic similar to removeVideoBySwitching
      if (!RECENTLY_PLAYED.some((v) => v.id === nextVideo.id)) {
        RECENTLY_PLAYED.push(nextVideo);
      }

      userQueue = userQueue.filter((v) => {
        return v.id !== nextVideo.id;
      });

      // if in queue there is only one element left, then we add to the queue all the elements from RECENTLY_PLAYED,
      // except for what is already in the queue, after shuffling RECENTLY_PLAYED
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

      // Resetting the current video time
      resetCurrentVideoTime();

      // Sending the updated queue to all connected users
      io.emit("updateQueue", [...userQueue]);
      io.emit("updateRecentlyPlayedQueue", [...RECENTLY_PLAYED]);
    }
  });

  socket.on("requestCurrentTime", () => {
    updateCurrentVideoTime();
    socket.emit("currentVideoTime", currentVideoDuration);
  });

  socket.on("disconnect", () => {
    connectedUsers--;

    // Delete the user from the array
    USERS = USERS.filter((user) => user.id !== socket.id);
    // Sending the updated list of users to all clients
    io.emit("getAllUsers", USERS);

    io.emit("getUsersCount", connectedUsers);
    console.log("Client disconnected", socket.id);
  });
};

module.exports = registerSocketHandlers;
