let agg       = document.getElementById('add')
let nameTask  = document.getElementById('entries-task')
let testTxt   = /^\w+\.*/
let files     = document.querySelectorAll('.cont-task li')
let contTask  = document.getElementById('cont-task')
let tofavo    = document.querySelectorAll('.right button:first-child')
let menu      = document.querySelectorAll('.right button:last-child')
let menuFiles = document.querySelectorAll('.window')
let checked   = document.querySelectorAll('.left button')
let contFavo  = document.querySelector('.cont-favo')
let general   = document.getElementById('tasks-general')

function Task(id, task, favorite, checked){
    this.id       = id
    this.task     = task
    this.favorite = favorite
    this.checked  = checked
}

let tasks          = []
let tasksAGuardar  = []
let idc            = 0
let idc2           = 0

let deleteTaskFunction = (event) => {
    tasks[event.target.id].task.parentElement.removeChild(tasks[event.target.id].task)
    let deleteId = event.target.id
    tasks = tasks.filter(task => task.task.id != parseInt(deleteId))
    tasksAGuardar = tasksAGuardar.filter(task => task.id !== parseInt(deleteId))
    idc = 0
    tasksAGuardar.forEach((element) => {
        element.id = idc
        idc++
    })
    idc = 0
    tasks.forEach((element) => {
        element.id = idc
        element.task.id = idc
        element.task.children[0].children[0].children[0].children[0].id = idc
        element.task.children[0].children[1].children[0].id = idc
        element.task.children[0].children[1].children[0].children[0].id = idc
        element.task.children[0].children[1].children[1].children[0].id = idc
        idc++
    })
    console.log(tasksAGuardar)
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
    menuFiles = document.querySelectorAll('.window')
    menuFiles[0].parentElement.removeChild(menuFiles[0])


    if(contFavo.childElementCount > 0){
        general.classList.add('active')
    }else{
        general.classList.remove('active')
    }
}

function aFavorito(event){ 
    if(tasks[event.target.id].task.parentElement === contTask){
        contFavo.insertAdjacentElement('beforeend', tasks[event.target.id].task)
        tasksAGuardar[tasks[event.target.id].id].favorite = true
        console.log(tasksAGuardar)
        localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))

        menuFiles = document.querySelectorAll('.window')
        if(menuFiles[0]){
            menuFiles[0].parentElement.removeChild(menuFiles[0])
        }
    }else{
        contTask.insertAdjacentElement('beforeend', tasks[event.target.id].task)
        tasksAGuardar[event.target.id].favorite = false
        localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))

        menuFiles = document.querySelectorAll('.window')
        if(menuFiles[0]){
            menuFiles[0].parentElement.removeChild(menuFiles[0])
        }
    }
    if(contFavo.childElementCount > 0){
        general.classList.add('active')
    }else{
        general.classList.remove('active')
    }
}

let aChecked = (event) => {
    event.stopImmediatePropagation()
    tasks[event.target.id].task.classList.toggle('active')
    if(tasks[event.target.id].task.classList.contains('active')){
        tasksAGuardar[event.target.id].checked = true 
        localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
    }else{
        tasksAGuardar[event.target.id].checked = false 
        localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
    }
}

let editTaskFunction = (event) => {
    taskAEditar = tasks[event.target.id].task.children
        taskAEditar[0].children[0].children[1].innerHTML = `<form><input type="text" 
        value="${taskAEditar[0].children[0].children[1].textContent}" placeholder="What do you need to do?"/>
                                                                    <button>Edit</button></form>`
        let editCamp = document.querySelector('h3 input')
        editCamp.select()
        console.log(tasks)
                
        let editButton = document.querySelector('h3 button')
        editButton.addEventListener('click', (e) => {
            e.preventDefault()
            if(testTxt.test(editCamp.value)){
                taskAEditar[0].children[0].children[1].innerText = editCamp.value
                tasksAGuardar[event.target.id].task = editCamp.value
                localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
                console.log(favoritesTasks)
            }else{
                editCamp.value = ""
            }
            })

        editCamp.addEventListener('blur', (e) => {
            e.preventDefault()
            if(testTxt.test(editCamp.value)){
                taskAEditar[0].children[0].children[1].innerText = editCamp.value
                tasksAGuardar[event.target.id].task = editCamp.value
                localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))   
            }else{
                taskAEditar[0].children[0].children[1].innerText = "task sin nombre"
                tasksAGuardar[event.target.id].task = "task sin nombre"
                localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
            }
        })
    }

let menuFunction = (event) => {
    event.stopImmediatePropagation()
    let newLi = document.createElement('li')
    newLi.innerHTML =`<div class="window-cont">
                <div id="${event.target.id}" onclick="editTaskFunction(event)">
                    <i class="fa-solid fa-pen" id="${event.target.id}"></i>
                    <p id="${event.target.id}">Edit Task</p>
                </div>

                <div id="${event.target.id}" onclick="aChecked(event)">
                    <i class="fa-solid fa-check" id="${event.target.id}"></i>
                    <p id="${event.target.id}">Mark as completed</p>
                </div>

                <div id="${event.target.id}" onclick="aFavorito(event)">
                    <i class="fa-regular fa-star" id="${event.target.id}"></i>
                    <p id="${event.target.id}">Mark as important</p>
                </div>
                <div id="${event.target.id}" onclick="deleteTaskFunction(event)">
                    <i class="fa-solid fa-trash" id="${event.target.id}"></i>
                    <p id="${event.target.id}">Delete task</p>
                </div>`
                newLi.setAttribute('class', 'window')
                menuFiles = document.querySelectorAll('.window')
                if(menuFiles.length < 1){
                    tasks[event.target.id].task.insertAdjacentElement('afterend', newLi)
                }else{
                    menuFiles[0].parentElement.removeChild(menuFiles[0])
                }
}

agg.addEventListener('click', (e) => {
    e.preventDefault()   
    e.stopPropagation()
    if(testTxt.test(nameTask.value)){
        let newBox = document.createElement('li')
        newBox.innerHTML =`<div class="files">
                                <div class="left">
                                    <button class="checked"><i class="fa-solid fa-check" id="${idc}" onclick="aChecked(event)"></i></button>
                                    
                                    <h3>${nameTask.value}</h3>
                                </div>
                                <div class="right">
                                    <button  class="tofavorite" id="${idc}"><i class="fa-regular fa-star" id="${idc}" onclick="aFavorito(event)"></i></button>
                                    <button class="menu"><i class="fa-solid fa-ellipsis" id="${idc}" onclick="menuFunction(event)"></i></button>
                                </div>   
                            </div>`
        newBox.setAttribute('id', `${idc}`)
        newBox.setAttribute('class', 'tasks-files')
        contTask.insertAdjacentElement('beforeend', newBox)
        tasks.push(new Task(idc, newBox, false, false))
        tasksAGuardar.push(new Task(idc, newBox.innerText, false, false))
        localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
        document.getElementById('alert').style.opacity = 0
        nameTask.value = ""
        idc++
    }else{
        document.getElementById('alert').style.opacity = 1
    }
})

function mantenerTasks(){
    if(JSON.parse(localStorage.getItem('tasks')).length > 0){
        document.addEventListener('DOMContentLoaded', () => {
            tasks = []
            tasksAGuardar = JSON.parse(localStorage.getItem('tasks'))
            idc = 0
            tasksAGuardar.forEach((element) => {
                var newBox = document.createElement('li')
                newBox.setAttribute('id', idc)
                newBox.setAttribute('class', 'tasks-files')
                newBox.innerHTML =`<div class="files">
                                        <div class="left">
                                            <button class="checked"><i class="fa-solid fa-check" id="${idc}" onclick="aChecked(event)"></i></button>
                                            
                                            <h3>${element.task}</h3>
                                        </div>
                                        <div class="right">
                                            <button  class="tofavorite"><i class="fa-regular fa-star" id="${idc}" onclick="aFavorito(event)"></i></button>
                                            <button class="menu"><i class="fa-solid fa-ellipsis" id="${idc}" onclick="menuFunction(event)"></i></button>
                                        </div>   
                                    </div>`
                
                if(element.favorite === false){
                    contTask.insertAdjacentElement("beforeend", newBox)
                }else{
                    contFavo.insertAdjacentElement("beforeend", newBox)
                    if(contFavo.childElementCount > 0){
                        general.classList.add('active')
                    }else{
                        general.classList.remove('active')
                    }  
                }
                if(element.checked === true){
                    newBox.classList.add('active')
                }
                tasks.push(new Task(idc, newBox, element.favorite, element.checked)) 
                idc++
            })
            idc2 = 0
            tasksAGuardar = []

            tasks.forEach((element) => {
                tasksAGuardar.push(new Task(idc2, element.task.children[0].children[0].children[1].innerText, element.favorite, element.checked))
                idc2++
            })

            localStorage.setItem('tasks', JSON.stringify(tasksAGuardar))
            if(tasks.length > 0){
                idc = tasks.length
            }else{
                idc = 0
            }
        })
    }
}
mantenerTasks()