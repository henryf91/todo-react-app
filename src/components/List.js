import React from 'react'

const List = ({lists, showTasks}) => {
    return (
      <ul className="list-group">  
          {
            lists.map((list) => {
              return (
                  <li key={list.id} className="list-group-item list-items" onClick={() => showTasks(list)}>{list.name} </li>
              );
            })
          }
      </ul>
    )
}

export default List;
