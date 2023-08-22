import React, { useContext } from "react";
import "./Header.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserContext } from "../../store/UserContext/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { setUser } = userContext;

  return (
    <header>
      <div>AgileRadio</div>

      <div>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/google`,
                {
                  googleId: credentialResponse.clientId,
                }
              );

              console.log("User authenticated:", response.data.user);
              setUser(credentialResponse.clientId!);
            } catch (error) {
              console.error("Authentication failed:", error);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          auto_select
        />
      </div>
    </header>
  );
};

export default Header;
