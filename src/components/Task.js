import React from 'react'

class Task extends React.Component {

    constructor(props) {
        super(props);
        const {name} = this.props.task
        this.state = {
          taskName: name,
          isEditingName: false,
        }
      }

    editTask = (taskName, indexTask, isDone) => {
        const {currentList, updateTask, task} = this.props
        const taskData = {
            currentList,
            task: {...task, name: taskName, isDone }
        }
        updateTask(taskData, indexTask)
        this.setState({isEditingName: false})
    }
    
    handleTaskName = (e) => {
        this.setState({taskName: e.target.value})
    }

    render(){
        const {task, indexTask, deleteTask, currentList} = this.props
        const {taskName, isEditingName} = this.state

        return ( 
            <div key={task.id} className="card" >
                <div className="card-body task-item">
                    <h5 className="card-title">{task.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ task.isDone ? "Terminada" : "Sin terminar" }</h6>
                    <a className="btn btn-warning card-link task-button" onClick={() => this.setState({isEditingName: true})}>Editar</a>
                    <a className="btn btn-success card-link task-button" onClick={() => this.editTask(taskName, indexTask, !task.isDone)}>{ !task.isDone ? "Completar" : "Reactivar" } </a>
                    <a className="btn btn-danger card-link task-button" onClick={() => deleteTask(indexTask, currentList)}>Eliminar </a>
                    {isEditingName &&
                    <div>
                        <input placeholder="Crea una nueva lista" type="text" value={taskName} onChange={this.handleTaskName} />
                        <button type="button" className="btn btn-success" onClick={() => this.editTask(taskName, indexTask, task.isDone)}>
                            Editar Tarea
                        </button>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Task;
