import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import { getTasks } from '../redux/selectors'

const TodoList = ({ todos }) => {
    <ul className="todo-list">
        {todos & todos.length
        ? todos.map((todo, index) => {
            return <Todo key={`todo-${todo.index}`} todo={todo}/>;
        })
        : "No tasks"}
    </ul>
};

const mapStateToProps = (state) => {
    const { visibilityFilter } = state;
    const allTasks = getTasks(state);
    return {
        todos:
            visibilityFilter === 'all'
            ? allTasks
            : visibilityFilter === 'completed'
                ? allTasks.filter(todo => todo.completed)
                : allTasks.filter(todo => !todo.completed)
    };
};

export default connect(mapStateToProps)(TodoList);