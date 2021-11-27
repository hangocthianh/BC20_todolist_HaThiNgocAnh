import TaskService from "../services/TaskService.js";
import Task from "../models/Task.js";

const getEle = (id) => document.getElementById(id);
const taskService = new TaskService();
let isLoading = false;

// loader
const checkLoading = () => {
    if (isLoading) {
        getEle("loading").style.display = "block";
    } else {
        getEle("loading").style.display = "none";
    }
}

// kiểm tra rỗng
const validation = (task) => {
    if (task.trim() != "") {
        return true;
    }
    alert("Task empty!");
    return false;
}

// lấy danh sách cv
const getListTask = () => {
    isLoading = true;
    checkLoading();
    taskService
        .getListTaskAPI()
        .then((result) => {
            //console.log(result);
            isLoading = false;
            checkLoading();
            renderTask(result.data);
        })
        .catch((error) => {
            console.log(error);
            isLoading = false;
            checkLoading();
        })
}
getListTask();

// hiện ds công việc
const renderTask = (data) => {
    let contentTodo = "";
    let contentComp = "";
    const todo = data.filter(task => task.status == "todo");
    todo?.forEach((todo) => {
        contentTodo += `
            <li>
                <span>${todo.textTask}</span>
                <div class="buttons">
                <button class="remove" onclick="deleteTask(${todo.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete">
                    <i class="far fa-check-circle" onclick="updateTaskTodo(${todo.id})"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
                </div>
            </li>
            `
    });
    getEle("todo").innerHTML = contentTodo;


    const completed = data.filter(task => task.status == "completed");
    completed?.forEach((completed) => {
        contentComp += `
        <li>
            <span>${completed.textTask}</span>
            <div class="buttons">
            <button class="remove" onclick="deleteTask(${completed.id})">
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="complete">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle" onclick="updateTaskComp(${completed.id})"></i>
            </button>
            </div>
        </li>
        `
    });
    getEle("completed").innerHTML = contentComp;
}

// thêm công việc
const addTask = () => {
    const textTask = getEle("newTask").value;
    let status = "todo";
    const task = new Task(textTask, status);
    if (validation(textTask)) {
        isLoading = true;
        checkLoading();
        taskService
            .addTaskAPI(task)
            .then((result) => {
                isLoading = false;
                checkLoading();
                alert("Add success!");
                getListTask();

            })
            .catch((error) => {
                console.log(error);
                isLoading = false;
                checkLoading();
            })
    }

}
getEle("addItem").onclick = addTask;

// xóa cv
const deleteTask = (id) => {
    isLoading = true;
    checkLoading();
    taskService
        .deleteTask(id)
        .then((result) => {
            isLoading = false;
            checkLoading();
            getListTask();
            alert("Delete success!")
        })
        .catch((error) => {
            isLoading = false;
            checkLoading();
            console.log(error);
        });
}
window.deleteTask = deleteTask;


// update cv
const updateTask = (task) => {
    isLoading = true;
    checkLoading();
    taskService
        .updateTaskAPI(task)
        .then((result) => {
            isLoading = false;
            checkLoading();
            alert("Change status success!");
            getListTask();
        })
        .catch((error) => {
            isLoading = false;
            checkLoading();
            console.log(error);
        })
};
// update cv đang làm
const updateTaskTodo = (id) => {
    taskService
        .getTaskByID(id)
        .then((result) => {
            result.data.status = "completed";
            updateTask(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
}
window.updateTaskTodo = updateTaskTodo;

// update cv đã làm
const updateTaskComp = (id) => {
    taskService
        .getTaskByID(id)
        .then((result) => {
            result.data.status = "todo";
            updateTask(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
}
window.updateTaskComp = updateTaskComp;

