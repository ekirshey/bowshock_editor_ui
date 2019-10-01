import React, { Component } from 'react';
import MainMenu from './MainMenu.js'
import EditorInterface from './EditorInterface.js';
import './App.css';

class App extends Component {

    state = {
        room_status : null,
        messages : []
    }

    // You can use something in react called a context to pass the socket around easier
    socket = EditorInterface.buildSocket()

    componentDidMount() {
        this.socket.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.socket.onmessage = evt => {
            const message = JSON.parse(evt.data)
            
            // Parse the data
            if (message.type === "create_room" || 
                message.type === "join_room") 
            {
                
                let owner = false
                if (message.type === "create_room") {
                    owner = true;
                }
                
                if ( message.result === "OK") 
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
                            error : message.error
                        }
                    }))                   
                }
            }
            else if (message.type === "leave_room")
            {
                this.setState(state => ({ 
                    room_status: null
                }))     
            }
            else {
                this.addMessage(message)
            }
        }

        this.socket.onclose = () => {
            // automatically try to reconnect on connection loss
            this.setState({
                socket: EditorInterface.buildSocket(),
            })
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [ ...state.messages, message ] }))

    render() {
        return (
            <MainMenu socket={this.socket} 
                      messages={this.state.messages}
                      room_status={this.state.room_status} />
        );
    }
}

export default App;
