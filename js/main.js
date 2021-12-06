import {UI} from "./view.js"

const list = [
    {
        id: 1,
        name: 'Сверстать этот TODO list',
        status: 'ToDo',
        priority: 'high'
    },
    {
        id: 2,
        name: 'Посмотреть ютубчик',
        status: 'ToDo',
        priority: 'low'
    },
];


let freeId = list.length + 1;

function getName(form){
    return form.querySelector('input').value
}

function findIndexBy(property, value) {
    return list.findIndex(item => item[property] === value);
}

function toggleStatus(event){
    let taskId = Number(this.id);
    let index = findIndexBy('id', taskId)

    if (index === -1)
        return;
    let currentStatus = list[index]['status'];
    if (currentStatus === "ToDo"){
        list[index]['status'] = "Done";
        this.parentNode.parentNode.classList.add("done");
    }
    else if (currentStatus === "Done"){
        list[index]['status'] = "ToDo";
        this.parentNode.parentNode.classList.remove("done");
    }
}

function addTask(event){
    event.preventDefault()
    
    
    let newTaskNode = this.cloneNode(true);

    let input = newTaskNode.querySelector('input');
    if (input.value.trim() === ""){
        this.querySelector('input').parentNode.parentNode.classList.add('type-error');
        let timer = setTimeout(() => {
            this.querySelector('input').parentNode.parentNode.classList.remove('type-error');
        }, 1000)
        return;
    }

    this.querySelector('input').value = "";

    //Add task in prog
    
    let name = input.value;
    let priority = input.dataset.priority;

    let newTask = {
        id: freeId++,
        name,
        status: "ToDo",
        priority
    };
    list.push(newTask);

    //Add task in web
    newTaskNode.addEventListener('submit', deleteTask);
    input.addEventListener('click', toggleStatus);

    input.className = "";
    input.type = "checkbox";
    input.name = name;
    input.id = newTask.id;
    input.after(document.createElement('label'));
    input.nextSibling.for = name;
    input.nextSibling.textContent = name;
    newTaskNode.querySelector('button').className = "";

    let div = document.createElement('div');
    div.className = "task";
    div.append(newTaskNode);
    
    if (priority === "high"){
        UI.TaskList.high.prepend(div)
    }
    else{
        UI.TaskList.low.prepend(div)
    }
}

function deleteTask(event){
    event.preventDefault();
    let checkbox = this.querySelector('input');
    let taskId = Number(checkbox.id);
    let index = findIndexBy('id', taskId);

    if (index != -1) {
        list.splice(index, 1);
        this.parentNode.remove();
    }
}

///////////////////////////////////////////////////////////


function AddEvent(elements, event, handler){
    for (let e of elements){
        e.addEventListener(event, handler)
    }
}

window.onload = function() {
    //work with tasks
    AddEvent(UI.forms.Task, 'submit', deleteTask);
    AddEvent(UI.checkboxTask, 'click', toggleStatus);

    //creating new task
    AddEvent(UI.forms.AddTask, 'submit', addTask);
}