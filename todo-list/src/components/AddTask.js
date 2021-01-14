import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../redux/actions';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleAddTask() {
        this.props.addTask(this.state.input);
        this.setState({
            input: ''
        });
    }

    render() {
        return(
            <div>
                <input
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button class="add-task" onClick={this.handleAddTask}>
                    Add Task
                </button>
            </div>
        );
    }
}

export default connect(null, { addTask })(AddTask);