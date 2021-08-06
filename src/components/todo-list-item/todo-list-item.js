import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  render() {
    // деструктуризируем данные чтобы легче было использовать
    const { label, onDeleted,
      onToggleDone, onToggleImportant,
      important, done } = this.props;

    let classNames = 'todo-list-item'

    if (done) {
      classNames += ' done'
    }

    if (important) {
      classNames += ' important'
    }

    return (
      // те самые видимые значения label
      <span className={ classNames }>
      <span
        className="todo-list-item-label"
        onClick={ onToggleDone } >
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={ onToggleImportant } >
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={ onDeleted } >
        <i className="fa fa-trash-o" />
      </button>
    </span>
    );
  }
}
