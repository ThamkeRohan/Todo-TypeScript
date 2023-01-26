interface Task{
    id:number,
    title:string,
    completed:boolean
}
const taskTitle=document.querySelector<HTMLInputElement>("#task-title")
const taskForm=document.querySelector<HTMLFormElement>("#task-form")
const taskFormContainer=document.querySelector("#task-form-container")
const taskList=document.querySelector<HTMLLIElement>("#task-list")

let tasks :Task[]=getFromLocalStorage()
tasks.forEach((task)=>{
    addItemToList(task)
})
taskForm?.addEventListener("submit",function(e){
    e.preventDefault()
    if(taskTitle?.value =="" || taskTitle?.value == null) {
        handleError()
        return
    }
    const newTask:Task={
        id:Math.random()*10000,
        title:taskTitle.value,
        completed:false
    }
    tasks.push(newTask)
    addItemToList(newTask)
    saveToLocalStorage()
    taskTitle.value=""
    
   
})


function addItemToList(newTask : Task){
    const listItem=document.createElement("li")
    const itemTitle=document.createElement("input")
    const checkbox=document.createElement("input")
    checkbox.type = "checkbox";
    const editBtn = document.createElement("button");
    const removeBtn = document.createElement("button")

    checkbox.checked=newTask.completed
    checkbox.addEventListener("change",function(){
        newTask.completed=checkbox.checked
        saveToLocalStorage()
    })
    
    itemTitle.value = newTask.title;
    
    removeBtn.textContent="delete"
    removeBtn.className="material-symbols-outlined delete"
    removeBtn.addEventListener("click",function(){
        listItem.remove()
        tasks=tasks.filter((task)=>{
            return task.id !== newTask.id
        })
        saveToLocalStorage()
    })

    editBtn.textContent="edit"
    editBtn.className = "material-symbols-outlined edit";
    editBtn.addEventListener("click",function(){
        newTask.title=itemTitle.value
        saveToLocalStorage()
    })

    
    listItem.append(checkbox, itemTitle,editBtn,removeBtn);
    listItem.className="single-task"
    taskList?.append(listItem);
    
}

function saveToLocalStorage(){
    localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function getFromLocalStorage(){
    const tasks=localStorage.getItem("TASKS")
    if(!tasks) return []
    return JSON.parse(tasks) as Task[]
}
function handleError(){
    const error=document.createElement("p")
    error.className="error"
    error.textContent="Please enter the task"
    taskFormContainer?.append(error)
    setTimeout(function(){
        error.remove()
    },2000)
}