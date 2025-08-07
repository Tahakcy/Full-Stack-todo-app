let input = document.querySelector('#myInput');
let showButton = document.querySelector('#showBtn');
let addButton = document.querySelector('#addBtn');
let clearAllButton = document.querySelector('#clcBtn');
const todoList = document.querySelector('#todoList');
const URL = 'http://localhost:5000/todoList';

function loadTodos(){
    fetch(URL)
    .then(res => res.json())
    .then(todos => {

        todoList.innerHTML ='';
        
        todos.forEach(todo => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;

            const span = document.createElement('span');
            span.textContent = todo.task

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'DEL';

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);

            todoList.appendChild(li)

            checkbox.addEventListener('change', () => {
                fetch(URL+'/'+ todo.id, {
                    method:'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        task: todo.task, 
                        completed: checkbox.checked
                    })
                })
                    .then(() => loadTodos());
                    
            });

            deleteButton.addEventListener('click', () => {
                fetch(URL+'/'+ todo.id, {
                    method:'DELETE',
                })
                .then(() => loadTodos());
            });
        });
    });
}

addButton.addEventListener('click', () => {
    let task = input.value.trim();

    if(task === ''){
        alert('Boş görev eklenemez!');
        return;
    }    

    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({task:task, completed:false})  
    })
    .then(() => {
        input.value ='';
        loadTodos();
    })
});

    window.addEventListener('DOMContentLoaded', loadTodos);


/*clearAllButton.addEventListener('click', () => {

});*/

