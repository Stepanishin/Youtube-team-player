import React from "react";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Header from "./Components/Header/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext/UserContext";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import { FavoriteProvider } from "./context/FavoriteContext/FavoriteContext";
import { PlayerProvider } from "./context/PlayerContext/PlayerContext";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <UserProvider>
          <FavoriteProvider>
            <PlayerProvider>
              <ThemeProvider>
                <Header />
                <VideoPlayer />
              </ThemeProvider>
            </PlayerProvider>
          </FavoriteProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
