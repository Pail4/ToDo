import {UI} from "./view.js";
import { format } from 'date-fns'

const list = [

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
    event.preventDefault();

    let currentInput = this.querySelector('input')

    if (currentInput.value.trim() === ""){
        currentInput.parentNode.parentNode.classList.add('type-error');
        let timer = setTimeout(() => {
            currentInput.parentNode.parentNode.classList.remove('type-error');
        }, 1000)
        return;
    }

    //Add task in prog

    let newTaskNode = UI.Samples.task.cloneNode(true);
    let input = newTaskNode.querySelector('input');
    let label = newTaskNode.querySelector('label');
    
    let name = currentInput.value;
    let priority = currentInput.dataset.priority;
    let date = format(new Date(), "dd.MM.yy");

    let newTask = {
        id: freeId++,
        name,
        status: "ToDo",
        priority,
        date
    };
    list.push(newTask);

    //Add task in web
    newTaskNode.querySelector('form').addEventListener('submit', deleteTask);
    input.addEventListener('click', toggleStatus);

    input.name = name;
    input.id = newTask.id;
    input.value = currentInput.value;
    label.for = name;
    label.textContent = name;
    newTaskNode.querySelector('.right-buttons span').textContent = date;

    
    if (priority === "high"){
        UI.TaskList.high.prepend(newTaskNode)
    }
    else{
        UI.TaskList.low.prepend(newTaskNode)
    }
    currentInput.value = "";
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