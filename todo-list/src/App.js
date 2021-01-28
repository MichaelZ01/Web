import React from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import visibilityFilter from './components/VisibilityFilters'


class App extends React.Component {

    render() {
        return(
            <div>
                <h1>TODO List</h1>
                <AddTask />
                <TodoList />
                <visibilityFilter />
            </div>
        );
    }
};




