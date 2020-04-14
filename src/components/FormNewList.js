import React from 'react'

class FormNewList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          newList: "",
        }
      }
    
      handleChangeName = (e) => this.setState({newList: e.target.value})
    
    render(){

        const {addTaskList} = this.props;
        const {newList} = this.state;

        return (
            <div className="row">
                <div className="col-md-8">
                    <input placeholder="Crea una nueva lista" type="text" value={newList} onChange={this.handleChangeName} />
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-success" onClick={() => addTaskList(newList)}>
                        Crear Lista
                    </button>
                </div>
            </div>
        )  
    }
}

export default FormNewList;