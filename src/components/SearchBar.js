import React from 'react'
import '../styles/SearchBar.css';

function SearchBar(props) {
  const checkTaskBox = () => {
    const content = document.getElementById('taskBox').value;
    const errorMessage = document.getElementById('taskError');

    if (content.length > 100) {
      errorMessage.textContent = 'Task must be under 100 characters long';
      return false;
    }
    else {
      errorMessage.textContent = '';
      return true;
    }
  }

  return (
    <div className="search">
        <button id='addJob' onClick={() => props.updateTasks(checkTaskBox)}>Add Task</button>
        <input type="text" id="findTask" placeholder='Find task' onKeyUp={props.findTasks}/>
        <section className='listItem' id='searchBar'>
            <span>Task:</span><span className="errorMessage" id="taskError"></span><input type="text" id="taskBox" onKeyUp={checkTaskBox}/>
            <span id='dateText'>Completion date:</span><span className="errorMessage" id="dateError"></span><input type="text" id="dateBox"/>
        </section>
    </div>
  )
}

export default SearchBar