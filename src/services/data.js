let localServerUrl = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL; // http://localhost:3000/api/todos

export async function getTodosFromBackend(){
    let response = await fetch(`${localServerUrl}/getAllTodos`); // http://localhost:3000/api/todos/getAllTodos
    let todos = await response.json();

    return todos;
}

export async function createTodoOnBackend(inputValue){
    await fetch(`${localServerUrl}/add`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: inputValue }), // inputValue = "test todo 2"
        }
    )
}

export async function deleteTodoOnBackend(todoId){
    await fetch(`${localServerUrl}/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )
}

export async function editIsChecked(todoId, isChecked){
    await fetch(`${localServerUrl}/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )
}

export async function editTodoOnBackend(todoId, newTask) {
    console.log(`Sending request to /api/editTask/${todoId} with task: ${newTask}`);
    const response = await fetch(`${localServerUrl}/editTask/${todoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to update todo: ${response.status}`, errorData);
        throw new Error(`Failed to update todo: ${response.status}`);
    }

    return response.json();
} 