let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks)
        {
            storedTasks.forEach((task) => tasks.push(task)) 
            updatelist();
            updatestatus();
        }
});

const addtask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();
    if (!text) {
        alert("Invalid task input");
        return; 
    }
    if (text) {
        const date = new Date();
        const task = {
            text: text,
            completed: false,
            date: date.toLocaleDateString(), 
            time: date.toLocaleTimeString() 
        };
        tasks.push(task);
        taskinput.value = "";
    }
    updatelist();
    updatestatus();
    savetask();
};

const toggleTaskComplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    console.log({tasks});
    updatelist();
    updatestatus();
    savetask();
}

const deletetask=(index)=>{
    tasks.splice(index,1);
    updatelist();
    updatestatus();
    savetask();
};

const edittask=(index)=>{
    const taskinput=document.getElementById("taskinput")
    taskinput.value=tasks[index].text;
    tasks.splice(index,1);
    updatelist();
    updatestatus();
    savetask();
};

const updatestatus=()=>{
    const completedtask=tasks.filter(task => task.completed).length;
    const totaltask=tasks.length;
    const progress = totaltask > 0 ? (completedtask / totaltask) * 100 : 0;
    const progressbar=document.getElementById("progress");
    progressbar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText=`${completedtask}/${totaltask}`;
    savetask();
};

const savetask=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
};
const searchTasksByDate = () => {
    const searchDate = document.getElementById('searchdate').value;
    if (searchDate) {
        const filteredTasks = tasks.filter(task => task.date === new Date(searchDate).toLocaleDateString());
        updatelist(filteredTasks);
        updatelist(tasks);
    }
};
const updatelist = () => {
    const tasklist = document.getElementById('tasklist');
    tasklist.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <p>${task.text}</p>
                <small>${task.date} ${task.time}</small>
            </div>
            <div class="icons">
                <img src="./images/2editicon.png" width="50px" height="50px" onclick="edittask(${index})">
                <img src="./images/deleteicon.png" width="50px" height="50px" onclick="deletetask(${index})">
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        tasklist.append(listItem);
    });
};
document.getElementById("lists").addEventListener("click", function (e) {
    e.preventDefault();
    addtask();
});
document.getElementById("searchbtn").addEventListener("click", function (e) {
    e.preventDefault();
    searchTasksByDate();
});

