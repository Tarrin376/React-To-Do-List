import React from 'react'
import '../styles/SearchBar.css';

function SearchBar(props) {
  return (
    <React.Fragment>
        <button id='addJob' onClick={props.updateTasks}>Add</button>
        <input type="text" id="findTask" placeholder='Find task' />
        <section className='listItem' id='searchBar'>
            <span>Task:</span><span className="errorMessage" id="taskError"></span><input type="text" id="taskBox"/>
            <span id='dateText'>Completion date:</span><span className="errorMessage" id="dateError"></span><input type="text" id="dateBox"/>
        </section>
    </React.Fragment>
  )
}

export default SearchBar