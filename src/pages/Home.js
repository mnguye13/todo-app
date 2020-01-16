import React, { useState } from "react";
import logo from "../logo.svg";
import companylogo from "../kryptowire.png";
import "../App.css";
import moment from "moment";
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./Login";
import "./Home.css"


function Home(props){
    function Welcome(props){
    return <h1>Welcome, {props.name}</h1>;
    }

    return(
        <div className="home">
            <Welcome name =""/>
            <Button onClick={()=>{props.history.push("/users")}}>Sign In</Button>
            <h1>Company News</h1>
        </div>
    )

}

export default Home;