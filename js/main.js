import {UI} from "./view.js"

const list = [
    {
        id: 1,
        name: 'create a post',
        status: 'ToDo',
        priority: 'low'
    },
    {
        id: 2,
        name: 'test',
        status: 'Done',
        priority: 'high'
    },
    {
        id: 3,
        name: 'create a ToDo',
        status: 'ToDo',
        priority: 'high'
    }
];

const statuses = ['status', 'ToDo', 'Done'];

const priorities = ['priority', 'high', 'low'];

let freeId = list.length + 1;

function getName(form){
    return form.querySelector('input').value
}


function findIndexBy(property, value) {
    return list.findIndex(item => item[property] === value);
}

function toggleStatus(event){
    let index = findIndexBy('id', taskId)

    if (index != -1)
        list[index]['status'] = newStatus;
}

function addTask(event){
    event.preventDefault()
    let input = this.querySelector('input')
    let name = input.value;
    let priority = input.dataset.priority;
    input.value = "";

    let newTask = {
        id: freeId++,
        name,
        status: "ToDo",
        priority
    };
    list.push(newTask);
    updateContent();
}

function deleteTask(event){
    event.preventDefault();
    let checkbox = this.querySelector('input');
    let taskId = Number(checkbox.id);
    let index = findIndexBy('id', taskId);

    if (index != -1) {
        list.splice(index, 1);
    }
    updateContent();
}

///////////////////////////////////////////////////////////

function updateContent(){
    for (let item of list){

    }
}

function AddEvent(elements, event, handler){
    for (let e of elements){
        e.addEventListener(event, handler)
    }
}

window.onload = function() {
    //work with tasks
    AddEvent(UI.TaskForms, 'submit', deleteTask);
    AddEvent(UI.checkboxTask, 'click', toggleStatus);

    //creating new task
    AddEvent(UI.AddTaskForms, 'submit', addTask);

}