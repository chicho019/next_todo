"use client";

import { useEffect, useState } from "react";
import { deleteTodoOnBackend, editIsChecked, editTodoOnBackend } from "@/services/data";
import TodoItem from "@/komponentebi/TodoItem";


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
        <div className="todoApp">
            <div className="todoHeader">Todo List</div>
            <div className="todoBody">
                <div className="todoList">
                    {uncheckedTodos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            editingId={editingId}
                            newTask={newTask}
                            setEditingId={setEditingId}
                            setNewTask={setNewTask}
                            handleEditSubmit={handleEditSubmit}
                            handleCheckboxClick={handleCheckboxClick}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                    <button className="toggleButton" onClick={() => setShowCheckedTodos(!showCheckedTodos)}>
                        {showCheckedTodos ? 'Hide Completed Todos' : 'Show Completed Todos'}
                    </button>
                    {showCheckedTodos && (
                        <div className="checkedTodoList">
                            {checkedTodos.length === 0 ? (
                                <p>No completed todos</p>
                            ) : (
                                checkedTodos.map((todo) => (
                                    <TodoItem
                                        key={todo._id}
                                        todo={todo}
                                        editingId={editingId}
                                        newTask={newTask}
                                        setEditingId={setEditingId}
                                        setNewTask={setNewTask}
                                        handleEditSubmit={handleEditSubmit}
                                        handleCheckboxClick={handleCheckboxClick}
                                        deleteTodo={deleteTodo}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
