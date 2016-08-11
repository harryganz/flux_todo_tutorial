import React, { Component } from 'react';

// Components
import TodoList from './TodoList';
import TodoForm from './TodoForm';

// Stores
import TodoStore from '../stores/TodoStore';

// Actions
import {create, destroy} from '../actions/TodoActions';

function getTodoState () {
  return {
    todos: TodoStore.getAll()
  };
}

class App extends Component {
  constructor (props) {
    super(props);

    this.state = getTodoState();

    // Bind Custom functions
    this._onChange = this._onChange.bind(this);
  }

  _onChange () {
    this.setState(getTodoState());
  }

  componentDidMount () {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TodoStore.removeChangeListener(this._onChange);
  }

  render () {
    return (
      <div>
        <TodoList todos={this.state.todos} destroyTodo={destroy}/>
        <TodoForm createTodo={create}/>
      </div>
    );
  }
}

export default App;
