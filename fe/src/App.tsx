import React from "react";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Header from "./Components/Header/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./store/UserContext/UserContext";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="879160999218-mj177tu4jtt26b6v5p14cp0463ogq7qr.apps.googleusercontent.com">
        <UserProvider>
          <Header />
          <VideoPlayer />
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
