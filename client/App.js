import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LogIn";
import RegisterPage from "./pages/Register";
import SearchMap from "./pages/SearchMap";
import { Text } from "react-native";
import { getUser } from "./endpoints";

export default function App() {
  const [page, setPage] = useState("login");
  const authState = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [auth, setAuth] = authState;

  const handleSetLogin = () => {
    setPage("login");
  };

  const handleSetRegister = () => {
    setPage("register");
  };

  const checkToken = async () => {
    try {
      const res = await getUser(auth);
      if (res.success) setIsLoggedOut(false);
    } catch (err) {
      setIsLoggedOut(true);
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, [auth]);

  return (
    <>
      {isLoggedOut ? (
        page === "login" ? (
          <LoginPage toggleState={handleSetRegister} authState={authState} />
        ) : (
          <RegisterPage toggleState={handleSetLogin} authState={authState} />
        )
      ) : (
        <SearchMap auth={auth} />
      )}
    </>
  );
}
