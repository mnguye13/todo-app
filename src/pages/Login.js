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
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import "./Login.css";
import companylogo from "../kryptowire.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {}

  function handleSubmit(event) {
    event.preventDefault();
    try {
      if (username === "admin" && password === "admin") {
        alert("success");
      } else {
        alert("invalid");
      }
    } catch (e) {
      alert(e.message);
    }
  }

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
        </FormGroup>
      </div>
    </Router>
  );
}

export default Login;
