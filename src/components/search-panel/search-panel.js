import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  // функц. возврата значения для поиска
  onSearchChange = (e) => {
    // то что вводим в инпут записывается в переменную term
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             onChange={ this.onSearchChange }
             value={this.state.term} />
    );
  }
};


