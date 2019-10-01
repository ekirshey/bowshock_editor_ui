import React from 'react';
import { useState } from 'react';
import EditorInterface from './EditorInterface.js';

export default function LoginMenu( props ) {
    console.log(props)      
    if ( props.room_status == null ) {
        return <LoginForm socket={props.socket} />;
    } 
    else if (props.room_status.hasOwnProperty("error"))
    {
        return <LoginForm socket={props.socket} error={props.room_status.error} />;
    }
    else {
        return <LoginInfo socket={props.socket} room_status={props.room_status} />
    }
}

function PrintError( props ) 
{
    if (props.error == null)
    {
        return <div></div>
    }
    else {
        return <font color="red">ERROR: {props.error} </font>
    }
}

function LoginForm( props ) {
    const [form, setValues] = useState({
        room_type : "",
        user_name : "",
        user_password : "",
        room_name : "",
        room_password : "",
    });

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(form);
        
        EditorInterface.initializeRoom( form, props.socket )
    }

    // I'll clean this up at some point
    return (
        <div>
            <PrintError error={props.error}/>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        <input type="radio" 
                            name="room_type" 
                            value="create_room"
                            onChange={updateField} />
                        Create
                    </label>
                    <label>
                        <input type="radio" 
                            name="room_type" 
                            value="join_room"
                            onChange={updateField} />
                        Join
                    </label>
                </div>
                <div>
                    <label htmlFor="user_name">
                        User Name 
                    </label>
                    <input type="text" 
                           name="user_name" 
                           value={form.user_name} 
                           onChange={updateField} />
                </div>
                <div>
                    <label htmlFor="user_password">
                        User Password 
                    </label>
                    <input type="password" 
                           name="user_password" 
                           value={form.user_password} 
                           onChange={updateField} />
                </div>
                <div>
                    <label htmlFor="room_name">
                        Room Name 
                    </label>
                    <input type="text" 
                           name="room_name" 
                           value={form.room_name}
                           onChange={updateField} />
                </div>
                <div>
                    <label htmlFor="room_password">
                        Room Password 
                    </label>
                    <input type="password" 
                        name="room_password" 
                        value={form.password} 
                        onChange={updateField} />
                </div>
                <input type="submit" value="Submit" />
            </form>            
        </div>
    );
}

function LoginInfo( props ) {
    function handleLeaveRoom(e) {
        EditorInterface.leaveRoom( props.socket )
    }

    return (
        <div>
            <div>     
                Room Name: {props.room_status.room_name} 
            </div>    
            <div>
                User Name: {props.room_status.user_name}
            </div>
            <div>
                <button type="button" onClick={handleLeaveRoom}>Leave Room</button> 
            </div>
        </div>
    );
}