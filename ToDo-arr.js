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
        status: 'InProgress',
        priority: 'high'
    }
];

const statuses = ['status', 'ToDo', 'InProgress', 'Done'];

const priorities = ['priority', 'high', 'low'];

let freeId = [list.length + 1];


function findIndexBy(property, value) {
    return list.findIndex(item => item[property] === value);
}

function findTasksBy(property, value) {
    return list.filter(item => item[property] === value);
}

function changeStatus(taskId, newStatus){
    let index = findIndexBy('id', taskId)

    if (index != -1)
        list[index]['status'] = newStatus;
}

function addTask(name, status = "ToDo", priority = 'low'){
    let newTask = {
        id: freeId.pop(),
        name,
        status,
        priority
    };
    list.push(newTask);
    if (!freeId.length)
        freeId.push( list.length + 1);
}

function deleteTask(taskId){
    let index = findIndexBy('id', taskId);

    if (index != -1) {
        freeId.push(list[index].id);
        list.splice(index, 1);
    }
}

function showTask(item) {
    console.log('\t' + item.id);
    console.log('\t' + item.name);
    console.log();
}

function showListBy(property){
    let buf = [];
    for (let key of property.slice(1)) {
        console.log(key + ':')
        buf = findTasksBy(property[0], key);
        if (buf.length){
            buf.forEach(item => {showTask(item)});
        }
        else{
            console.log('\t-');
        }
    }
}