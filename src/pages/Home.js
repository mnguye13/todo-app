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
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticate, isUnAuthenticate, setUser } from '../actions';
import { useHistory } from "react-router-dom";
import Weather from "../components/Weather";

function Home(props){
    const isAuthenticated = useSelector(state=>state.isAuthenticate);
    const userData = useSelector(state=>state.setUser);
    const dispatch = useDispatch();
    const history = useHistory();
    function signout(){
        dispatch(isUnAuthenticate());
    }
    function Welcome(props){
        if(isAuthenticated)
         return (
             <div>
                <h1>Welcome, {userData.username}</h1>
                <Button onClick={e=>{signout()}}>Sign out</Button>
                <Button onClick={()=>history.push("/reminder")}>Go to Reminder</Button>
            </div>
        );
        return <Button onClick={()=>{history.push("/users")}}>Sign In</Button>
    }


    return(
        <div className="home">
            <h1>Home Page</h1>
            <Welcome/>
            <Weather/>
            
        </div>
    )

}

export default Home;