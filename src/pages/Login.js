import React, { useState } from "react";
import moment from "moment";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  FormGroup,
  InputGroup,
  Label,
  setHotkeysDialogProps
} from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import "./Login.css";
import companylogo from "../kryptowire.png";
import Reminder from "./Reminder";
import Home from "./Home";
import {useAuth} from "../Auth";
import { Card, Logo, Form, Input, Error} from "../AuthForms";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated,userHasAuthenticated]=useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);


  var users = {user:'admin', pass:'admin'}

  function handleSubmit(event,props) {
    event.preventDefault();
    try {
      if (username === users.user && password === users.pass) {
        userHasAuthenticated(true);
        alert("success");

      } else {
        userHasAuthenticated(false);
        setIsError(true)
      }

      if(isAuthenticated){
        return (<Redirect to ="/reminder"/>);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Router>
      <div className="login">
        <img src={companylogo} className="company-logo" alt="companylogo" />
        <h1 className="bp3-heading"> Kryptowire Employee Portal</h1>
        <FormGroup>
          <Label className="bp3-label">
            Username
            <InputGroup
              className="bp3-input"
              id="user-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Label>

          <Label className="bp3-label">
            Password
            <InputGroup
              className="bp3-input"
              id="password-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Label>

          <Button className="login-btn" onClick={e => handleSubmit(e)}>
            Sign In
          </Button>
          {isError && <Error>Invalid Username/Password</Error>}
        </FormGroup>
  {/*<Route path = "/" render = {() => (isAuthenticated? (<Redirect to = "/reminder" component = {Reminder} />) : (<Redirect to ="/" component = {Home}/>))}/>*/}
      </div>
    </Router>
  );
}

export default Login;
