import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { isAuthenticate, isUnAuthenticate, setUser } from '../actions';

function Reminder() {
  const [names, setNames] = useState("Minh Nguyen");
  const isAuthenticated = useSelector(state=> state.isAuthenticate);
  const userData = useSelector(state=>state.setUser);

  const history = useHistory();
  const dispatch = useDispatch();
  //if(!isAuthenticated2) history.push('/users');

  const [todos, setTodos] = useState([
    {
      content: "Learn React",
      isCompleted: false
    },
    {
      content: "Learn GraphQL",
      isCompleted: false
    },
    {
      content: "Build ToDo app",
      isCompleted: false
    },
    {
      content: "Report to Brian",
      isCompleted: false
    }
  ]);


  useEffect(()=>{
      console.log("render");
  });


  function handleKeyDown(event, index) {
    if (event.key === "Enter") {
      createTodoAtIndex(event, index);
    }
    if (event.key === "Backspace" && todos[index].content === "") {
      event.preventDefault();
      return removeTodoAtIndex(index);
    }
  }

  function createTodoAtIndex(event, index) {
    const newToDos = [...todos];
    newToDos.splice(index + 1, 0, {
      content: "",
      isCompleted: false
    });
    setTodos(newToDos);
    setTimeout(() => {
      document.forms[0].elements[index + 1].focus();
      //document.querySelector('todo-list').focus();
    }, 0);
  }

  function updateTodoAtIndex(event, index) {
    const newToDos = [...todos];
    newToDos[index].content = event.target.value;
    setTodos(newToDos);
  }

  function removeTodoAtIndex(index) {
    if (index === 0 && todos.length === 1) return;
    setTodos(todos.filter((_,index1) =>index1!==index))
    setTimeout(() => {
      document.forms[0].elements[index - 1].focus();
      //document.querySelector('todo-list');
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  function updateName(event) {
    var newName = [...names];
    newName = event.target.value;
    setNames(newName);
  }

  function printLists() {
    window.print();
  }

  function completeTasks() {
    var counter = 0;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) {
        counter += 1;
      }
    }
    return counter;
  }

  function incompleteTasks() {
    var counter = todos.length;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) {
        counter -= 1;
      }
    }
    return counter;
  }

  function timer() {
    var clock = moment().format("hh:mm:ss A");
    return clock;
  }

  function signout(){
    dispatch(isUnAuthenticate());
  }

  //setInterval(timer, 1000);

  var complete = completeTasks();
  var incomplete = incompleteTasks();
  var progress = (completeTasks() / todos.length) * 100;
  var clock = timer();

  return (
    <div className="app">
              <h1>Status: {isAuthenticated?"Logged in":0}</h1>
      <div className="header">
        <img src={companylogo} className="logo1" alt="companylogo" />
        <h2 className="bp3-heading">Hello <a className="nameField">{userData.username}</a></h2>

        {/*<input
          className="nameField "
          type="text"
          value={names}
          onChange={e => updateName(e)}
        />*/}

        <h3 className="bp3-heading">
          Today's date is {moment().format("MM/DD/YYYY")}
        </h3>
        <h3 className="bp3-heading">Current time is {clock}</h3>
      </div>

      <form className="todo-list">
        <div>
          <p>
            You have completed {complete} tasks, {incomplete} remaining{" "}
          </p>
        </div>
        <div
          className="bp3-progress-bar bp3-intent-primary .modifier"
          style={{ width: "10%" }}
        >
          <div
            className="bp3-progress-meter"
            style={{ width: progress + "%" }}
          ></div>
        </div>
        <p>{progress}%</p>
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && "todo-is-completed"}`}>
              <div
                className={"checkbox"}
                onClick={() => toggleTodoCompleteAtIndex(i)}
              >
                {todo.isCompleted && <span>&#x2714;</span>}
              </div>
              <input
                className="tasks"
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
        <Button intent="success" text="Print" onClick={() => printLists()} />
        <Button  text="Sign Out" onClick={()=>{signout()}} />
      </form>
    </div>
  );
}

export default Reminder;
