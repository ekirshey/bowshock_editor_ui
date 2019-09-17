import React, { Component } from 'react';
import MainMenu from './MainMenu.js'
import EditorInterface from './EditorInterface.js';
import './App.css';

class App extends Component {

    state = {
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
            console.log(message);
            // Actually parse data here
            this.addMessage(message)
        }

        this.socket.onclose = () => {
            console.log('disconnected')
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
            <MainMenu socket={this.socket} messages={this.state.messages} />
        );
    }
}

export default App;
