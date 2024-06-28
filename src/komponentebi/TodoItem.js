"use client";
import React from "react";

export default function TodoItem({ todo, editingId, newTask, setEditingId, setNewTask, handleEditSubmit, handleCheckboxClick, deleteTodo }) {
    return (
        <div key={todo._id} className="todoItem">
            <div className="todoCheckbox">
                <input
                    checked={todo.completed ? true : false}
                    onChange={(event) => {
                        handleCheckboxClick(event.target.checked, todo._id);
                    }}
                    type="checkbox"
                    data-todoid={todo._id}
                />
            </div>
            <div className="todoName">
                {editingId === todo._id ? (
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onBlur={() => handleEditSubmit(todo._id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEditSubmit(todo._id);
                            }
                        }}
                        autoFocus
                    />
                ) : (
                    <span>{todo.task}</span>
                )}
            </div>
            <div className="actions">
                {editingId === todo._id ? (
                    <button onClick={() => handleEditSubmit(todo._id)}>Save</button>
                ) : (
                    <>
                        <span className="btnEdit" onClick={() => { setEditingId(todo._id); setNewTask(todo.task); }}>Edit</span>
                        <span className="btnDelete" onClick={() => deleteTodo(todo._id)}>Delete</span>
                    </>
                )}
            </div>
        </div>
    );
}
 