import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuth} from "./Auth";
function PrivateRoute({component: Component, path, ...rest}){
    const isAuthenticated = useAuth();
    return(
        <Route path ={path} {...rest} render = {(props)=> isAuthenticated? (
            <Component {...props} />
        ): (
        <Redirect to = {{pathname:"/users", state:{
            prevLocation: path,
            error: "You need to login first!",
        }}}/>
        )
    }/>
    );
}

export default PrivateRoute;