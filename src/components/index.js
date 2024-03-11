import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import './index.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            let todoText = inputValue.trim();
            const regex = /\d+$/;
            const match = todoText.match(regex);
            let count = match ? parseInt(match[0]) : 1;
            todoText = todoText.replace(regex, '').trim();
            const newTodos = [...todos];
            for (let i = 0; i < count; i++) {
                newTodos.push({ text: todoText, editedCount: 0 });
            }
            setTodos(newTodos);
            setInputValue('');
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleEditStart = (index) => {
        setEditIndex(index);
        setEditValue(todos[index].text);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSave = () => {
        const newTodos = [...todos];
        newTodos[editIndex].text = editValue;
        newTodos[editIndex].editedCount += 1;
        setTodos(newTodos);
        setEditIndex(null);
    };

    return (
        <div className="todo-list">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add Todo..."
                className="input-field"
            />
            <button onClick={handleAddTodo} className="add-button">Add Todo</button>
            <ul className="todo-items">
                {todos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        {editIndex === index ? (
                            <div className='each-todo-container'>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={handleEditChange}
                                    className="edit-input"
                                />
                                <button onClick={handleEditSave} className="save-button">Save</button>
                            </div>
                        ) : (
                            <div className='each-todo-container'>
                                <p className='todo-text'>{todo.text} <span>(Updated {todo.editedCount} Times)</span></p>
                                <div>
                                    <FontAwesomeIcon icon={faPencil} flip='horizontal' onClick={() => handleEditStart(index)} className="edit-icon" />
                                    <FontAwesomeIcon icon={faXmark} onClick={() => handleDeleteTodo(index)} className="delete-icon" />
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
