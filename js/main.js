import {UI} from "./view.js";
import { format } from 'date-fns'

const list = [

];


let freeId = list.length + 1;

function findIndexBy(property, value) {
    return list.findIndex(item => item[property] === value);
}

function toggleStatus(){
    let taskId = Number(this.id);
    let index = findIndexBy('id', taskId)

    if (index === -1)
        return;
    let thisTask = this.parentNode.parentNode;
    let currentStatus = list[index]['status'];
    if (currentStatus === "ToDo"){
        list[index]['status'] = "Done";
        thisTask.classList.add("done");
    }
    else if (currentStatus === "Done"){
        list[index]['status'] = "ToDo";
        thisTask.classList.remove("done");
    }
}

function addTask(event){
    event.preventDefault();

    let currentInput = this.querySelector('input');
    let currentSearch = currentInput.parentNode.parentNode;

    if (currentInput.value.trim() === ""){
        currentSearch.classList.add('type-error');
        setTimeout(() => {
            currentSearch.classList.remove('type-error');
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

    if (index === -1) return;

    list.splice(index, 1);
    this.parentNode.remove();
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