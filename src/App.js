import React from 'react';
import './App.css';
import List from './components/List';
import Task from './components/Task';
import FormNewList from './components/FormNewList';
import FormNewTask from './components/FormNewTask';
import { uuid } from 'uuidv4';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      showFormNewList: false,
      showFormNewTask: false,
      showTasks: false,
      currentList: "",
    }
  }

  addTaskList = (newList) =>{
        
    const listToAdd = {
      id: uuid(),
      name: newList,
      dateOfCreation: new Date(),
      tasks: [],
    }
    
    this.setState({
      lists: [
        ...this.state.lists, 
        listToAdd
      ],
      showFormNewList: false
    })
  }

  addTask = (newTask, currentList) => {
    let lists = [...this.state.lists]
    let listIndex = lists.findIndex((list) => list.id === currentList )
    
    let tasks = [...lists[listIndex].tasks]
    tasks.push({
      id: uuid(),
      name: newTask,
      isDone: false
    })
    lists[listIndex] = {...lists[listIndex], tasks}
    
    this.setState({ 
      lists,
      showFormNewTask: false,
    })

  }

  deleteTask = (indexTask, currentList) => {
    let lists = [...this.state.lists]
    const listIndex = lists.findIndex((list) => list.id === currentList)
    let tasks = [...lists[listIndex].tasks]
    const newTaskList = tasks.filter((task, index) => indexTask !== index)
    lists[listIndex] = {...lists[listIndex], tasks: newTaskList}
    console.log(this.state.lists, "del perreo")
    console.log(lists, "del bacile")

    this.setState({
      lists
    })
    
  }

  updateTask = (taskData, indexTask) => {
    const {task} = taskData

    this.setState((prevState) => {
      let lists = [...prevState.lists]  
      const listIndex = lists.findIndex((list) => list.id === taskData.currentList)
      let tasks = lists.find((list) => list.id === taskData.currentList ).tasks
      let updatedTasks = [...tasks]
      updatedTasks[indexTask] = {...updatedTasks[indexTask], name: task.name, isDone: task.isDone}
      lists[listIndex] = {...lists[listIndex], tasks: updatedTasks}

      return { lists }
    })
  }     

  showTasks = (list) => {
      this.setState({showTasks: true, currentList: list.id, showFormNewTask: false,})
  }
  
  render(){

    const { lists, showFormNewList, showFormNewTask, showTasks, currentList } = this.state;
    const list = lists.find((list) => list.id === currentList)

    return (
      <div className="App container">
        <h1>Todo List</h1>
        <div className="row main-container">
          <div className="col-md-6 list-container">
            {(lists.length === 0 && !showFormNewList) && <h4>No hay listas de tareas creadas:</h4>}
            {showFormNewList ? 
              <FormNewList
                addTaskList={this.addTaskList}
              />
            : 
              <button type="button" className="btn btn-primary new-list-button" onClick={(e) => {this.setState({showFormNewList: true})}}>
                  Agregar nueva lista
              </button>
          }
            
            <List
              lists={lists}
              showTasks={this.showTasks}
            />
          </div>
          <div className="col-md-6 list-container">
           
            {(showTasks && list.tasks.length === 0) &&
              <h4>No hay tareas asignadas</h4>
            }
            {(!showFormNewTask && showTasks) 
              && 
                <button type="button" className="btn btn-primary" onClick={(e) => {this.setState({showFormNewTask: true})}}>
                    Agregar nueva Tarea
                </button>
                
              }
            {showFormNewTask ? 
              <FormNewTask
                addTask={this.addTask}
                currentList={currentList}
              />
            : 
             null
          }

          {(showTasks && list.tasks.length > 0) && 
             list.tasks.map((task, indexTask) => {


               return <Task
                        key={task.id}
                        task={task}
                        currentList={currentList}
                        updateTask={this.updateTask}
                        indexTask={indexTask}
                        deleteTask={this.deleteTask}
                      />
             })
             
          }
            
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
 