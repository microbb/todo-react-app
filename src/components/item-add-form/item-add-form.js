import React, {Component} from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {

  // Чтобы удобно было отслеживать изменение и его записывать
  state = {
    label: ''
  }

  // Функция которая занимается изменением label в state
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
  }

  render() {
    return (
      <form className='item-add-form d-flex'
            onSubmit={ this.onSubmit } >
        <input type="text" className='form-control'
        placeholder='what needs to be done'
        onChange={ this.onLabelChange } />
        <button
          className='btn btn-outline-secondary' >
          Добавить
        </button>
      </form>
    );
  }
}
