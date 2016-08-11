import React, {Component} from 'react';

class TodoForm extends Component {
  constructor (props) {
    super(props);

    // Bind custom functions
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit (e) {
    e.preventDefault();

    let form = this.refs.form;
    let text = this.refs.todoText.value.trim();

    this.props.createTodo(text);

    form.reset();
  }

  render () {
    return (
      <div>
        <h3>Submit a new item</h3>
        <form onSubmit={this._onSubmit} ref='form'>
          <label>Todo:</label> <br/>
          <input type='text' ref='todoText'/> <br/>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

module.exports = TodoForm;
