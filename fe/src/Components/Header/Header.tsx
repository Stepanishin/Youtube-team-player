import React, { useContext } from "react";
import "./Header.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "../../assets/svg/svg";
import DarkModeToggle from "../UI/DarkModeToggle/DarkModeToggle";
import { FavoriteContext } from "../../context/FavoriteContext/FavoriteContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const favoriteContext = useContext(FavoriteContext);

  if (!userContext || !favoriteContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user, setUser, picture, setPicture, role, setRole } = userContext;
  const { favoriteUserList, setFavoriteUserList } = favoriteContext;

  const beLogin = async (email?: any, picture?: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/google`,
        {
          email: email,
          role: "user",
        }
      );
      setUser(email);
      setPicture(picture);
      setRole(response.data.user.role);
      setFavoriteUserList(response.data.user.favoriteVideos);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      beLogin(userInfo.data.email, userInfo.data.picture);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <header>
      <div>AgileRadio</div>

      <div className="Header__right-side">
        <DarkModeToggle />
        {user ? (
          <button className="google-button" onClick={() => googleLogin()}>
            <img className="google-avatar" src={picture} alt="avatar" />
            <div className="google-email">
              <span>{user}</span>
            </div>
          </button>
        ) : (
          <button className="google-button" onClick={() => googleLogin()}>
            <GoogleIcon /> Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
