export default class TaskService{
    getListTaskAPI(){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/task",
            method: "GET",
        })
    }
    addTaskAPI(task){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/task",
            method: "POST",
            data: task,
        })
    }
    deleteTask(id){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/task/"+id,
            method: "DELETE",
        })
    }
    getTaskByID(id){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/task/"+id,
            method: "GET",
        })
    }
    updateTaskAPI(task){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/task/"+ task.id,
            method: "PUT",
            data: task,
        })
    }
}