import React, { useState, useEffect, useMemo } from "react";
import {
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { withRouter } from "react-router";
import jwtDecode from "jwt-decode";
import { getToken, removeToken, setToken } from "./api/token";
import AuthContext from "./context/AuthContext";
import Login from "./components/Login";
import Notes from "./components/Notes";
import "./Sass/index.sass";

function App() {
  const history = useHistory();
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    let token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => {
        if (auth) {
          removeToken();
          setAuth(undefined);
          history.push("/");
        }
      },
      setReloadUser,
    }),
    [auth, history]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Route exact path="/" component={Login}>
        {auth ? <Redirect to="/homepage" /> : <Login />}
      </Route>
      <Route path="/homepage" component={Notes}>
        {!auth ? <Redirect to="/" /> : <Notes />}
      </Route>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
