import React from "react";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Header from "./Components/Header/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext/UserContext";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import { FavoriteProvider } from "./context/FavoriteContext/FavoriteContext";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="879160999218-mj177tu4jtt26b6v5p14cp0463ogq7qr.apps.googleusercontent.com">
        <UserProvider>
          <FavoriteProvider>
            <ThemeProvider>
              <div className="container">
                <Header />
                <VideoPlayer />
              </div>
            </ThemeProvider>
          </FavoriteProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
