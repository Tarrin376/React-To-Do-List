import React, { useState } from 'react'
import '../styles/SearchBar.css';

function SearchBar(props) {
  return (
    <div className="search">
        <button id='addJob' onClick={props.updateTasks}>Add Task</button>
        <input type="text" id="findTask" placeholder='Find task' onKeyUp={props.findTasks}/>
        <section className='listItem' id='searchBar'>
            <span>Task:</span><span className="errorMessage" id="taskError"></span><input type="text" id="taskBox"/>
            <span id='dateText'>Completion date:</span><span className="errorMessage" id="dateError"></span><input type="text" id="dateBox"/>
        </section>
    </div>
  )
}

export default SearchBar