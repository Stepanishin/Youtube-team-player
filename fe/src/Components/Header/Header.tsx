import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "../../assets/svg/svg";
import DarkModeToggle from "../UI/DarkModeToggle/DarkModeToggle";
import { FavoriteContext } from "../../context/FavoriteContext/FavoriteContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import Logo from "../UI/Logo/Logo";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import Heading from "../UI/Heading/Heading";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import useMediaQuery from "@/utils/hooks/useMediaQuery";

const Header = () => {
  const userContext = useContext(UserContext);
  const favoriteContext = useContext(FavoriteContext);
  const { mode } = useContext(ThemeContext);

  if (!userContext || !favoriteContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user, setUser, picture, setPicture, setRole } = userContext;
  const { setFavoriteUserList } = favoriteContext;

  const beLogin = async (email: string, picture?: string) => {
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
    <header
      className={`${
        mode === "dark" ? "bg-background-bgDark100" : "bg-background-bgLight200"
      } flex justify-between px-8 py-4 items-center`}
    >
      <Logo />

      <div className="flex items-center gap-4">
        <DarkModeToggle />
        {user ? (
          <div className="flex items-center gap-4">
            <img className="w-9 h-9 rounded-full" src={picture} alt="avatar" />
            <div className="flex flex-col items-start">
              <Heading type={HeadingTypeEnum.h3_Default}>{user}</Heading>
              <button
                className={`${
                  mode === "dark"
                    ? "text-accent-gray200"
                    : "text-accent-gray400"
                } font-nunitoSans text-[12px] font-normal leading-4`}
                onClick={() => googleLogin()}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <DefaultButton onClick={() => googleLogin()}>
            <span className="flex items-center gap-2">
              <GoogleIcon /> LOG IN
            </span>
          </DefaultButton>
        )}
      </div>
    </header>
  );
};

export default Header;
