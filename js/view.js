export let UI = {
    forms: {
        AddTask: document.querySelectorAll('.add-task form'),
        Task: document.querySelectorAll('.task form'),
    },
    TaskList: {
        high: document.querySelector('.high-tasks'),
        low: document.querySelector('.low-tasks'),
    },
    checkboxTask: document.querySelectorAll('.task input[type = "checkbox"]'),
}