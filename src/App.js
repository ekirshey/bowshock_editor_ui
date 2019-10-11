import React, { Component } from 'react';
import Draggable from 'react-draggable';
import WebSocketClient from './WebSocketClient.js'
import {EditorSchema, EditorInterface} from './EditorInterface.js';
import LoginMenu from './LoginMenu.js'
import ModelTable from './ModelTable.js'
import './App.css';

class App extends Component {

    state = {
        login_status : null,
        room_status : null,
        messages : [],   
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
            if (message.type === EditorSchema.message_type.ADD_NEW_USER || 
                message.type === EditorSchema.message_type.AUTHENTICATE_USER) 
            {
                console.log(message)
                if ( message.result === EditorSchema.server_status.OK) 
                { 
                    this.setState(state => ({ 
                        login_status: {
                            user_name : message.user_name
                        }
                    }))
                }
                else {             
                    this.setState(state => ({ 
                        login_status: {
                            error : message.result_str
                        }
                    }))                   
                }
            }
            else if (message.type === EditorSchema.message_type.CREATE_ROOM || 
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
            else if (message.type === EditorSchema.message_type.MEMBERS_UPDATE)
            {
                console.log("new one?")
                console.log(this.state.room_status)

                this.setState(state => ({ 
                    room_status : {
                        ...state.room_status,
                        members : message.members
                    }
                }))

                console.log(`test ${this.state.room_status.room_name}`)
            }
            else {
                this.addMessage(message)
            }
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [ ...state.messages, message ] }))

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };
    
    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        // Create minimizable box??
        return (
            <div>
                <Draggable {...dragHandlers}>
                    <div className="dynamic_box">
                        <div>
                            <LoginMenu wsc={this.wsc} 
                                       login_status={this.state.login_status}
                                       room_status={this.state.room_status}/>
                        </div>
                    </div>
                </Draggable>
                <Draggable {...dragHandlers}>
                    <div className="dynamic_box">
                        <ModelTable wsc={this.wsc} messages = {this.state.messages} />
                    </div>
                </Draggable>
            </div>
        );
    }
}

export default App;
