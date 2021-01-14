import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }



    submitMessage() {
        this.props.submitNewMessage(this.state.input);
        this.setState((state)=>({
            input: ''
        }));
    }

    render() {
        return(
            <div>
                <h1>TODO List</h1>
                <h2>Add a new task:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button
                    onClick ={this.submitMessage}>
                Submit</button>
                <ul>
                    {this.props.messages.map((message, idx)=> {
                        return(
                            <li key={idx}>{message}</li>
                        )
                    })}
                </ul>
            </div>
        );
    }
};



const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = createStore(messageReducer);

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message));
        }
    }
};

//const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);




