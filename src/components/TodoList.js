import React, {PropTypes} from 'react';
import _ from 'lodash';

// Components
import TodoItem from './TodoItem';

const TodoList = function (props) {
  let {todos} = props;

  let todoItems = _.map(todos, el => <TodoItem key={el.id} todo={el} />);

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
  todos: PropTypes.object.isRequired
};

module.exports = TodoList;
