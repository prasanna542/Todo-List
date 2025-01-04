
document.addEventListener("DOMContentLoaded",()=>{

    function takeTasksFromLocalStorage(){
        allTasks = [];
        let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //storing all tasks in tasks array. 

        for(let i=0; i<tasks.length; i++){
            allTasks.push(tasks[i]);
        }//pushing all tasks in local array called allTasks. 

        for(let i=0; i<allTasks.length; i++){
            const div= document.createElement('div');
            div.setAttribute("class","task_box")
            if(allTasks[i].status === true){
                div.classList.add('completed');
            }
            div.innerHTML = `<p> ${allTasks[i].taskName}</p>
                                <button class="delete-task">Delete</button>`
    


            div.addEventListener("click",(event)=>{
                if(event.target.tagName === 'BUTTON'){
                    // alert("clicked on the delete button");
                    let id_clicked = allTasks[i].id;
                    deleteTask(id_clicked);
                    div.remove();
                    
                }
                else{
                    allTasks[i].status = !allTasks[i].status;
                    div.classList.toggle('completed');
                    saveTaskToLocalStorage();
                    // alert("clicked on this box");
                }
            });

            // div.querySelector('.delete-task').addEventListener('click', () => {
            //     deleteTask(allTasks[i].id);
            // });
    
            taskList.appendChild(div);
        }
    }
    
    
    function deleteTask(taskId){
        allTasks = allTasks.filter(task => task.id !== taskId);
        saveTaskToLocalStorage();
        // allTasks = [];
        // location.reload();
        // takeTasksFromLocalStorage();
    }
    
    
    function saveTaskToLocalStorage(){
        localStorage.setItem("tasks",JSON.stringify(allTasks));
    }
    

    let taskEntered = document.getElementById('task_entry');
    let addButton = document.getElementById('addTaskButton');
    let taskList = document.getElementById('card_container');
    
    let allTasks = [];

    takeTasksFromLocalStorage();
    
    addButton.addEventListener('click', () => {
        
        if(taskEntered.value === ""){
            alert("please enter a task to add");
            return; 
        }
        else{
            let taskToEnter = taskEntered.value ;

            //lets create a object of that task
            let newTaskObject = {
                id: Date.now(),
                taskName: taskToEnter,
                status: false
            }
    
            
            allTasks.push(newTaskObject);
            saveTaskToLocalStorage();
            let div= document.createElement('div');
            div.innerHTML = `<p> ${newTaskObject.taskName}</p>
                                <button class="delete-task">Delete</button>`
    
            div.setAttribute("class","task_box")
            div.addEventListener("click",(event)=>{
                if(event.target.tagName === 'BUTTON'){
                    let id_clicked = newTaskObject.id;
                    deleteTask(id_clicked);
                    div.remove();
                    // alert("clicked on the delete button");
                    
                }
                else{
                    newTaskObject.status = !newTaskObject.status;
                    div.classList.toggle('completed');
                    saveTaskToLocalStorage();
                    // alert("clicked on this box");
                }
            });


            taskList.appendChild(div);
            
        
        }
        taskEntered.value = '';  //this is how we clear the input field in javascript. 
    })
})




