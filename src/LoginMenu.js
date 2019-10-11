import React from 'react';
import { useState } from 'react';
import {EditorSchema, EditorInterface} from './EditorInterface.js';

export default function LoginMenu( props ) {
    if ( props.login_status == null ) 
    {
        return <UserLoginForm wsc={props.wsc}/>;
    }
    else if (props.login_status.hasOwnProperty("error"))
    {
        return <UserLoginForm wsc={props.wsc} error={props.login_status.error} />;
    }
    else if ( props.room_status == null ) 
    {
        return <RoomLoginForm wsc={props.wsc} 
                              user_name={props.login_status.user_name} />;
    } 
    else if (props.room_status.hasOwnProperty("error"))
    {
        return <RoomLoginForm wsc={props.wsc} 
                              user_name={props.login_status.user_name}
                              error={props.room_status.error} />;
    }
    else {
        return <LoginInfo wsc={props.wsc} room_status={props.room_status} />
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

function UserLoginForm( props ) {
    const [form, setValues] = useState({
        login_type : 0,
        user_name : "",
        user_password : "",
    });

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        form.login_type = parseInt(form.login_type)
        console.log(form);
        EditorInterface.initializeUser( form, props.wsc )
    }

    // I'll clean this up at some point
    return (
        <div>
            <PrintError error={props.error}/>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        <input type="radio" 
                            name="login_type" 
                            value={EditorSchema.message_type.ADD_NEW_USER}
                            onChange={updateField} />
                        Create User
                    </label>
                    <label>
                        <input type="radio" 
                            name="login_type" 
                            value={EditorSchema.message_type.AUTHENTICATE_USER}
                            onChange={updateField} />
                        Login
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
                        value={form.password} 
                        onChange={updateField} />
                </div>
                <input type="submit" value="Submit" />
            </form>            
        </div>
    );
}

function RoomLoginForm( props ) {
    const [form, setValues] = useState({
        room_type : EditorSchema.message_type.CREATE_ROOM,
        user_name : props.user_name,
        admin_password : "",
        room_name : "",
        room_password : "",
        password_disabled : false,
    });

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const updateRadio = e => {
        
        var disabled = null;
        if (e.target.value === "0") {
            disabled = false;
        }
        else if (e.target.value === "1") {
            disabled = true;
        }

        setValues({
            ...form,
            password_disabled : disabled,
            [e.target.name] : e.target.value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        form.room_type = parseInt(form.room_type)
        EditorInterface.initializeRoom( form, props.wsc )
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
                            value={EditorSchema.message_type.CREATE_ROOM}
                            onChange={updateRadio}/>
                        Create
                    </label>
                    <label>
                        <input type="radio" 
                            name="room_type" 
                            value={EditorSchema.message_type.JOIN_ROOM}
                            onChange={updateRadio} />
                        Join
                    </label>
                </div>
                <div>
                    <label htmlFor="user_name">
                        User Name <b>{form.user_name}</b>
                    </label>
                </div>
                <div>
                    <label htmlFor="admin_password">
                        Admin Password 
                    </label>
                    <input type="password" 
                        name="admin_password" 
                        value={form.admin_password} 
                        onChange={updateField}
                        disabled={form.password_disabled} />
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
        EditorInterface.leaveRoom( props.wsc )
    }

    function buildMemberList() {
        let member_list = "No other members";
        let members = props.room_status.members;
        if (props.room_status.members != null) {
            member_list = <ul>
                {
                    members.map(
                        (member,i) =><li key={i}>{member}</li>
                    )
                }
            </ul>
        }
        
        return member_list
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
                Members: {buildMemberList()}
            </div>
            <div>
                <button type="button" onClick={handleLeaveRoom}>Leave Room</button> 
            </div>
        </div>
    );
}