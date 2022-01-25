let task = document.createElement("div");
task.classList.add("task");
task.innerHTML = "\n" +
    "    <form action=\"\">\n" +
    "       <input type=\"checkbox\" name=\"\" value=\"\" id=\"\">\n" +
    "       <label for=\"\"></label>\n" +
    "       <div class=\"right-buttons\">\n" +
    "          <button></button>\n" +
    "          <span></span>\n" +
    "       </div>\n" +
    "    </form>\n";

export const UI = {
    forms: {
        AddTask: document.querySelectorAll('.add-task form'),
        Task: document.querySelectorAll('.task form'),
    },
    TaskList: {
        high: document.querySelector('.high-tasks'),
        low: document.querySelector('.low-tasks'),
    },
    Samples: {
        task : task
    },
    checkboxTask: document.querySelectorAll('.task input[type = "checkbox"]'),
}