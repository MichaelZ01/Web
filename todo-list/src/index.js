import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// Top level component (UI)
import App from './App.js'

// Redux store (State)
import store from './redux/store'

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(
    <AppWrapper />,
    document.getElementById('root')
);