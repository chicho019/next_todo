"use client";

import { useEffect, useState } from "react";
import { deleteTodoOnBackend, editIsChecked, editTodoOnBackend } from "@/services/data";

export default function TodoSia({ todosList, reloadTodosList }) {
    const [editingId, setEditingId] = useState(null);
    const [newTask, setNewTask] = useState("");
    const [showCheckedTodos, setShowCheckedTodos] = useState(false);

    useEffect(() => {
        (async () => {
            await reloadTodosList();
        })();
    }, []);

    async function deleteTodo(todoId) {
        await deleteTodoOnBackend(todoId);
        await reloadTodosList();
    }

    async function handleCheckboxClick(isChecked, todoId) {
        await editIsChecked(todoId, isChecked);
        await reloadTodosList();
    }

    async function handleEditSubmit(todoId) {
        try {
            await editTodoOnBackend(todoId, newTask);
            await reloadTodosList();
            setEditingId(null); // Exit edit mode
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    }

    const checkedTodos = todosList.filter(todo => todo.completed);
    const uncheckedTodos = todosList.filter(todo => !todo.completed);

    return (
        <div className="todoList">
            {uncheckedTodos.map((todo) => (
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
            ))}
            <button onClick={() => setShowCheckedTodos(!showCheckedTodos)}>
                {showCheckedTodos ? 'Hide Completed Todos' : 'Show Completed Todos'}
            </button>
            {showCheckedTodos && (
                <div className="checkedTodoList">
                    {checkedTodos.length === 0 ? (
                        <p>No completed todos</p>
                    ) : (
                        checkedTodos.map((todo) => (
                            <div key={todo._id} className="todoItem">
                                <div className="todoCheckbox">
                                    <input
                                        checked={true}
                                        type="checkbox"
                                        disabled
                                    />
                                </div>
                                <div className="todoName">{todo.task}</div>
                                <div className="actions">
                                    <span className="btnDelete" onClick={() => deleteTodo(todo._id)}>Delete</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
