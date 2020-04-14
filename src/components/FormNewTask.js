import React from 'react'

class FormNewTask extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          newTask: "",
        }
      }
    
    handleChangeName = (e) => {
        this.setState({newTask: e.target.value})
    }

    render() {
        const {addTask, currentList} = this.props;
        const {newTask} = this.state;

        return (
            <div className="row form-new-list">
                <div className="col-md-8">
                    <input placeholder="Crea una nueva tarea" type="text" value={newTask} onChange={this.handleChangeName} />
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-success" onClick={() => addTask(newTask, currentList)}>
                        Crear Tarea
                    </button>
                </div>
            </div>
        )
    }
}

export default FormNewTask;