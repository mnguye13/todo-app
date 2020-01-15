import React, {useState} from 'react';
import logo from '../logo.svg';
import companylogo from '../kryptowire.png';
import '../App.css';
import moment from 'moment';
import { Button, Menu, MenuItem, Popover} from "@blueprintjs/core";
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Login from './Login';

function Reminder(){
    const [names, setNames] = useState('Minh Nguyen')
    const [todos, setTodos] = useState([
        {
        content:'Learn React',
        isCompleted: false,
        },
        {
        content:'Learn GraphQL',
        isCompleted: false,

        },
        {
        content:'Build ToDo app',
        isCompleted: false,
        },
        {
        content:'Report to Brian',
        isCompleted: false,
        },
    ]);


    function handleKeyDown(e,i){
        if(e.key==='Enter'){
        createTodoAtIndex(e,i);
        }
        if(e.key==='Backspace' && todos[i].content===''){
        e.preventDefault();
        return removeTodoAtIndex(i);
        }
    }

    function createTodoAtIndex(e,i){
        const newToDos = [...todos];
        newToDos.splice(i+1,0,{
        content:'',
        isCompleted:false,
        })
        setTodos(newToDos);
        setTimeout(()=> {
        document.forms[0].elements[i+1].focus();
        },0);
    }

    function updateTodoAtIndex(e,i){
        const newToDos=[...todos];
        newToDos[i].content= e.target.value;
        setTodos(newToDos);
    }

    function removeTodoAtIndex(i){
        if (i === 0 && todos.length === 1) return;
        setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
        setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
        }, 0);
    }

    function toggleTodoCompleteAtIndex(i){
        const temporaryTodos = [...todos];
        temporaryTodos[i].isCompleted = !temporaryTodos[i].isCompleted;
        setTodos(temporaryTodos);
    }

    function updateName(e){
        var newName = [...names];
        newName = e.target.value;
        setNames(newName);

    }

    function printLists(){
        window.print();
    }

    function completeTasks(){
        var counter = 0;
        for (var i =0; i < todos.length; i++){
        if (todos[i].isCompleted){
            counter += 1;
        }
        }
        return counter;
    }

    function incompleteTasks(){
        var counter = todos.length;
        for (var i =0; i < todos.length; i++){
        if (todos[i].isCompleted){
            counter -= 1;
        }
        }
        return counter;
    }

    function timer(){
        var clock = moment().format('hh:mm:ss A');
        return clock;
    }



    setInterval(timer,1000);

    var complete = completeTasks();
    var incomplete = incompleteTasks();
    var progress = completeTasks()/(todos.length)*100;
    var clock = timer();
    
    return(


        <div className="app">
        

        <div className="header">
        <img src={companylogo} className="logo1" alt="companylogo" />
        <h2 className="bp3-heading">Hello</h2>

        <input
            className = "nameField "
            type ="text"
            value = {names}
            onChange = {e => updateName(e) }
        />

        <h3 className="bp3-heading">Today's date is {moment().format('MM/DD/YYYY')}</h3>
        <h3 className="bp3-heading">Current time is {clock}</h3>

        </div>

        <form className="todo-list">
        <div>
            <p>You have completed {complete} tasks, {incomplete} remaining </p>
        </div>
        <div className="bp3-progress-bar bp3-intent-primary .modifier" style={{width:'10%'}}>
            <div className="bp3-progress-meter" style={{width:progress+'%'}}></div>
        </div>
        <p>{progress}%</p>
        <ul>
            {todos.map((todo, i) => (
            
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                    <span>&#x2714;</span>
                )}
                </div>
                <input
                className = 'tasks'
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
                />
            </div>
            ))}
        </ul>
        <Button intent="success" text="Print" onClick = {()=>printLists()}/>
        
        </form>
    </div>
    )

};

export default Reminder;
