import React, {Component, PropTypes} from 'react';

class TodoItem extends Component {
  constructor (props) {
    super(props);

    // Bind custom functions
    this._onClick = this._onClick.bind(this);
  }

  _onClick () {
    let id = this.props.todo.id;

    this.props.destroyTodo(id);
  }

  render () {
    let {todo} = this.props;

    return (
      <li>{todo.text} <button onClick={this._onClick}>Delete</button></li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  destroyTodo: PropTypes.func.isRequired
};

module.exports = TodoItem;
