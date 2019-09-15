import React from 'react';
import { useState } from 'react';
import EditorInterface from './EditorInterface.js';

export default function LoginMenu( props ) {
    const [form, setValues] = useState({
        room_type : "",
        user : "",
        room : "",
        password : "",
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
                    <label htmlFor="user">
                        User
                    </label>
                    <input type="text" 
                           name="user" 
                           value={form.user} 
                           onChange={updateField} />
                </div>
                <div>
                    <label htmlFor="room">
                        Room
                    </label>
                    <input type="text" 
                           name="room" 
                           value={form.room}
                           onChange={updateField} />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="text" 
                        name="password" 
                        value={form.password} 
                        onChange={updateField} />
                </div>
                <input type="submit" value="Submit" />
            </form>            
        </div>
    );
}