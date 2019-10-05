import React, { Component } from 'react';
import MainMenu from './MainMenu.js'
import WebSocketClient from './WebSocketClient.js'
import {EditorSchema, EditorInterface} from './EditorInterface.js';
import './App.css';

class App extends Component {

    state = {
        room_status : null,
        messages : []
    }

    // You can use something in react called a context to pass the wsc around easier
    wsc = new WebSocketClient();

    componentDidMount() {
        this.wsc.open(EditorInterface.url())

        this.wsc.onmessage = (data, flags, number) => {
            const message = JSON.parse(data.data)
            
            if (message === null) {
                console.log("Invalid response")
                this.setState(state => ({ 
                    room_status: {
                        error : "NULL RESPONSE"
                    }
                }))     
                return;
            }

            // Parse the data
            if (message.type === EditorSchema.message_type.CREATE_ROOM || 
                message.type === EditorSchema.message_type.JOIN_ROOM) 
            {
                
                let owner = false
                if (message.type === EditorSchema.message_type.CREATE_ROOM) {
                    owner = true;
                }
                
                if ( message.result === EditorSchema.server_status.OK) 
                { 
                    this.setState(state => ({ 
                        room_status: {
                            room_name : message.room_name,
                            user_name : message.user_name,
                            owner : owner,
                            members : message.members
                        }
                    }))
                }
                else {             
                    this.setState(state => ({ 
                        room_status: {
                            error : message.result_str
                        }
                    }))                   
                }
            }
            else if (message.type === EditorSchema.message_type.LEAVE_ROOM)
            {
                this.setState(state => ({ 
                    room_status: null
                }))     
            }
            else {
                this.addMessage(message)
            }
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [ ...state.messages, message ] }))

    render() {
        return (
            <MainMenu wsc={this.wsc} 
                      messages={this.state.messages}
                      room_status={this.state.room_status} />
        );
    }
}

export default App;
