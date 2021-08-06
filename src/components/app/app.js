import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component {

  maxID = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: ''
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxID++
    };
  }

  deletedItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {

      const newArray = [
        newItem,
        ...todoData
      ];

      return {
        todoData: newArray
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);

    // update obj
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    // construct new arr
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  // функц. для изменения свойства term в state
  onSearchChange = (term) => {
    this.setState({ term })
  }

  // функц. для фильтра
  search(items, term) {
    // если строка пустая, возвращает весь массив значений
    if(term.length === 0) {
      return items;
    }

    // фильтруем элементы приводя к нижнему регистру
    return items.filter(el => {
      // в каждом элементе ищем совпадение с тем что ввели в инпут term
      return el.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    })
  }


  render() {
    const { todoData, term } = this.state;
    // переменная которая отображает те видимые значения которая вернет функц. search
    const visibleItems = this.search(todoData, term);

    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      // передаем пропс onSearchChange для
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange }/>
          <ItemStatusFilter />
        </div>

        <TodoList
          // как пропс мы ее передаем в компонент TodoList
          todos={ visibleItems }
          onDeleted={ this.deletedItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
  );
  };
  }