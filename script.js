// let tempData = [
//     {
//         id:1,
//         title:"Eat healthy breakfast",
//         checked: true
//     },
//     {
//         id:2,
//         title:"Go to gym",
//         checked: true
//     },
//     {
//         id:3,
//         title:"Learn english for 2 hours",
//         checked: true

//     },
//     {
//         id:4,
//         title:"Study for 10 hours",
//         checked: false
//     }
// ];
let tempData = JSON.parse(localStorage.getItem("tasks")) ?? [];

let lastId = tempData[tempData.length - 1]?.id ?? 0;

// Build todo component
function BuildTodo(id, title, checked = false){
    return `
    <div class="todo-list__todo ${checked != false ?'completed':''}"  data-id=${id}>
        <div class="custome-checkbox">
            <input data-id="${id} id="${id}" type="checkbox" ${checked != false ?'checked':''}>
            <label data-id="${id}" for="${id}" ></label>
        </div>
        <div class="title"><p>${title}</p></div>
        <div class='options'>
            <div data-id=${id} class="edit"><img class="edit" data-id=${id} src="edit.png" alt=""></div>
            <div data-id=${id} class="delete"><img id='delete' class='delete' data-id=${id} src="bin.png" alt=""></div>
        </div>
    </div> `;
}
// Global 
const taskContainer = document.getElementById('todos');
const addInput = document.getElementById('todo-input');
const editElement = document.getElementById('todo-list__edit');
const timeNow = document.getElementById('time-now');

// Tasks Render
function RerenderTasks(){
    let todosContainer = document.getElementById('todos');
    todosContainer.innerHTML = "";
    tempData.forEach((todo) => {
        const{id, title, checked} = todo;
        todosContainer.innerHTML += BuildTodo(id, title, checked);
    })
    localStorage.setItem("tasks", JSON.stringify(tempData));

}
RerenderTasks();

// Create => Add task
let addBtn = document.getElementById('add');
addBtn.addEventListener('click', function(){
    let inputData = document.getElementById('todo-input').value;
    if(inputData.trim() == ""){
        alert("Please Enter Value.");
    }else{
        tempData.push({id: ++lastId, title: inputData});
        document.getElementById('todo-input').value = "";
        RerenderTasks();
    }
})

// Delete => Remove Task
taskContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('delete')){
        let currentId = Number(event.target.getAttribute('data-id'));
        let newData = tempData.filter(function(task){
            return task.id != currentId;
        })
        tempData = newData;
        RerenderTasks();
    }
})

// Show Edit Component 
let selectedId = 0;
taskContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('edit')){
        editElement.style.display = 'flex';
        selectedId = Number(event.target.getAttribute('data-id'));
        taskTitle = tempData.filter((task) => task.id == selectedId)[0].title;
        editElement.querySelector('#edit-input').value = taskTitle;
    }
})

// Close Edit Component
editElement.querySelector('.close').addEventListener('click', function(){
    editElement.style.display = 'none';
})


// Update => Edit Task Value 
editElement.querySelector('#edit').addEventListener('click', function(){;
    for(let task of tempData){
        if(task.id === selectedId){
            if(editElement.querySelector('#edit-input').value.trim() == ""){
                alert("Please Enter Value.");
                break;
            }else{
                task.title = editElement.querySelector('#edit-input').value;
                editElement.style.display = 'none';
                break;
            }
        }
    }
    RerenderTasks();
})
// Completed
taskContainer.addEventListener('click', function(event){
    console.log(event.target);
    if(event.target.tagName == 'LABEL' || event.target.tagName == 'INPUT'){
        // Change Data
        for(let task of tempData){
            if(task.id == event.target.getAttribute('data-id')){
                task.checked = !task.checked;
                console.log(task.checked);
            }
        }
        // Change ui
        RerenderTasks();
    }
})

// Cuurent Time 
function CurrentTime(){
    let date = new Date();
    return date.toLocaleTimeString(
        'en-US', 
        { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
    );
}CurrentTime();
// Time 
setInterval(function(){
    timeNow.innerText = CurrentTime();
},1000);