let output = document.querySelector('.output')
let c = document.querySelector('.c')
let x = document.querySelector('.x')
let equal = document.querySelector('.equal')
let btn = document.querySelectorAll('.btn')
output.textContent = ""

function appendToOutput(value) {
    if (output.textContent === "0") {
        output.textContent = value;
    }
    else if ((output.textContent || '').length < 12) {
        output.textContent = (output.textContent || '') + value;
    }
    else {
        console.log("error");
    }
}
// display num & dot & operators on output screen when click nums buttuns 
btn.forEach((button) => {
    button.addEventListener('click', () => {
        appendToOutput(button.textContent || '')
    })
})

// clear output screen 
c.addEventListener('click', () => {
    output.textContent = ""
})

// delete one num 
x.addEventListener('click', () => {
    output.textContent = output.textContent?.slice(0, -1) || ''
})

// operations
equal.addEventListener('click', () => {
    try {
        output.textContent = String(eval(output.textContent || ''))
    } catch {
        output.textContent = 'Error'
    }
})

// ========================================================================================
let input = document.getElementById("input")
let addbtn = document.getElementById("addbtn")
let todoList = document.querySelector(".todoList")

let todos = JSON.parse(localStorage.getItem("todos")) || []
let editId = null
renderTodos()
addbtn.addEventListener("click", function () {
    let text = input.value.trim()
    if (text === "") {
        return
    }
    if (editId) {
        let todo = todos.find(function (todo) {
            return todo.id === editId
        })
        todo.task = text
        editId = null
    }
    else {
        let todo = {
            id: Date.now(),
            task: text
        }
        todos.push(todo)
    }
    saveTodos()
    renderTodos()
    input.value = ""
})

function renderTodos() {
    todoList.innerHTML = ""
    todos.forEach(function (todo, index) {
        createTodoElement(todo, index + 1)
    })
}

function createTodoElement(todo, num) {
    let task = document.createElement("li")
    task.classList.add("task")
    let span = document.createElement("span")
    span.innerHTML = `
        <b>${num}</b> - ${todo.task}
    `
    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("deletebtn")
    deleteBtn.innerText = "🗙"
    let updateBtn = document.createElement("button")
    updateBtn.classList.add("updatebtn")
    updateBtn.innerText = "✎"
    deleteBtn.addEventListener("click", function () {
        deleteTask(todo.id)
    })
    updateBtn.addEventListener("click", function () {
        updateTask(todo.id)
    })
    task.appendChild(span)
    task.appendChild(deleteBtn)
    task.appendChild(updateBtn)
    todoList.appendChild(task)
}
function deleteTask(id) {
    todos = todos.filter(function (todo) {
        return todo.id !== id
    })
    saveTodos()
    renderTodos()
}

function updateTask(id) {
    let todo = todos.find(function (todo) {
        return todo.id === id
    })
    input.value = todo.task
    editId = id
}

function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    )
}