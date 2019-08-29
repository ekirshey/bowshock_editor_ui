import React, { Component } from 'react';
import MainMenu from './MainMenu.js'
import './App.css';

const URL = 'ws://localhost:8080'

class App extends Component {

    state = {
        messages : []
    }

    socket = new WebSocket(URL)

    componentDidMount() {
        this.socket.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.socket.onmessage = evt => {
            const message = JSON.parse(evt.data)
            console.log(message)
            this.addMessage(message)
        }

        this.socket.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                socket: new WebSocket(URL),
            })
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [ ...state.messages, message ] }))

    render() {
        return (
            <MainMenu socket={this.socket} messages={this.state.messages} />
        );
    }
}

export default App;
