import React, { useContext, useEffect } from "react";
import "./Header.css";
import axios from "axios";
import { UserContext } from "../../store/UserContext/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { GoogleIcon } from "../../assets/svg/svg";

const Header = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user, setUser, picture, setPicture } = userContext;

  const beLogin = async (email?: any, picture?: any) => {
    console.log("credentialResponse", email);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/google`,
        {
          email: email,
        }
      );
      console.log("response", response);
      setUser(email);
      setPicture(picture);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      console.log(userInfo);
      beLogin(userInfo.data.email, userInfo.data.picture);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <header>
      <div>AgileRadio</div>

      <div>
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
