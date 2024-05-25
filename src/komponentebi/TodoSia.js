"use client";

import { useEffect, useState } from "react";
import { deleteTodoOnBackend, editIsChecked } from "@/services/data";

export default function TodoSia({ apiUrl, todosList, reloadTodosList }){
    useEffect(async () => {
        await reloadTodosList();
    }, []);

    async function deleteTodo(todoId){
        await deleteTodoOnBackend(apiUrl, todoId);
        await reloadTodosList();
    }

    async function handleCheckboxClick(isChecked, todoId){
        await editIsChecked(apiUrl, todoId, isChecked);
        await reloadTodosList();
    }

    return <div class="todoList">
        {
            todosList.map((todo) => {
                return <div class="todoItem">
                        <div class="todoCheckbox">
                            <input checked={todo.completed ? true : false} onChange={(event) => { handleCheckboxClick(event.target.checked, todo.id) }} type="checkbox" data-todoid="762" />
                        </div>
                        <div class="todoName">{ todo.task }</div>
                        <div class="actions">
                            <span class="btnEdit">Edit</span>
                            {/* <span class="btnDelete" onClick={deleteTodo.bind(this, todo.id)}>Delete</span> */}
                            <span class="btnDelete" onClick={ () => { deleteTodo(todo.id) } }>Delete</span>
                        </div>
                    </div>
            })
        }
    </div>
}