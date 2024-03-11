import React from 'react';
import './App.css';
import TodoList from './components/index';

function App() {
  return (
    <div className="app">
      <h1 className="heading">Day Goals!</h1>
      <TodoList />
    </div>
  );
}

export default App;
