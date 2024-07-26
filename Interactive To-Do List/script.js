document.addEventListener('DOMContentLoaded',() => {

    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const allFilter = document.getElementById('all-filter');
    const completedFilter = document.getElementById('completed-filter');
    const pendingFilter = document.getElementById('pending-filter');

    let tasks = [];

    if (!taskInput || !addTaskButton || !taskList) {
        console.error('One or more elements are missing in the HTML.');
        return;
    }

    function renderTasks(filter= 'all'){
        taskList.innerHTML='';
        tasks.filter(task =>{
            if(filter === 'completed') return task.completed;
            if(filter === 'pending') return !task.completd;
            return true;
        }).forEach((task,index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;

            if(task.completed){
                taskText.style.textDecoration ='line-through';
            }
            li.appendChild(taskText);

            const btns = document.createElement('div');
            btns.className ='task-btns';

            const completeButton=document.createElement('button');
            completeButton.className = 'task-btn complete-btn';
            completeButton.textContent =task.completed ? 'Uncomplete' : 'Complete';
            completeButton.addEventListener('click',()=>{
                task.completed=!task.completed;
                renderTasks(filter);
            });
            btns.appendChild(completeButton);

            const editButton=document.createElement('button');
            editButton.className = 'task-btn edit-btn';
            editButton.textContent ='Edit';
            editButton.addEventListener('click',()=>{
                const newText = prompt('Edit task:',task.text);
                if(newText){
                    task.text = newText;
                    renderTasks(filter);
                }
            });
            btns.appendChild(editButton);

            const deleteButton=document.createElement('button');
            deleteButton.className = 'task-btn delete-btn';
            deleteButton.textContent ='Delete';
            deleteButton.addEventListener('click',()=>{
                tasks.splice(index,1);
                renderTasks(filter);

            });
            btns.appendChild(deleteButton);

            li.appendChild(btns);
            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const text =taskInput.value.trim();
        if(text) {
            tasks.push({text,completed:false});
            taskInput.value = '';
            renderTasks();
        }
    });

    allFilter.addEventListener('click',() => renderTasks('all'));
    completedFilter.addEventListener('click',()=> renderTasks('completed'));
    pendingFilter.addEventListener('click',()=>renderTasks('pending'));
});