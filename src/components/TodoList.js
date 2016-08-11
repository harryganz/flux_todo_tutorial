import React, {PropTypes} from 'react';
import _ from 'lodash';

// Components
import TodoItem from './TodoItem';

const TodoList = function ({todos, destroyTodo}) {
  let todoItems = _.map(todos, el => <TodoItem key={el.id} todo={el} destroyTodo={destroyTodo}/>);

  return (
    <div>
      <h3>Todo List:</h3>
      <ul>
        {todoItems}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
  destroyTodo: PropTypes.func.isRequired
};

module.exports = TodoList;
