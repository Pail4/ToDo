export let UI = {
    //Elements for adding a new task
    AddTaskForms: document.querySelectorAll('.add-task form'),
    newTaskInput: document.querySelectorAll('.new-task'),
    newTaskBtn: document.querySelectorAll('.submit-task'),

    //Elements for work with task
    TaskForms: document.querySelectorAll('.task form'),
    highTaskList: document.querySelector('.high-tasks'),
    lowTaskList: document.querySelector('.low-tasks'),
    labelTask: document.querySelectorAll('.task label'),
    checkboxTask: document.querySelectorAll('.task input[type = "checkbox"]'),
    deleteTask: document.querySelectorAll('.task button'),
}