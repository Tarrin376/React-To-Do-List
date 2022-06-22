import React from 'react'
import Job from './Job';
import '../styles/JobList.css';

const selectedJobs = new Set();

// JobList react component that is used to render all of the user's completed and
// active tasks. 
function JobList({ tasks, update, getLocalStorage, highlightAction }) {
  // Responsible for removing a task by filtering the data by it's id.
  // Will update the local JSON storage and update the UI for the 
  // end user.
  function removeTask(id) {
    const filteredTasks = getLocalStorage().filter((task) => task.id !== id);
    update(filteredTasks, true);
  }
  
  // This method will remove all of the current filters applied to
  // the to-do list so the user can see all of their tasks.
  const filterByAll = () => {
    update(getLocalStorage(), false); // Removes all current filters.
    highlightAction(0); // Apply the 'selected' css style to the 'filter all' element.
  }
  
  const isActive = (completed) => new Date(completed) > new Date(); // Returns a boolean value whether the task is complete or not.
  const clearCompleted = () => update(getLocalStorage().filter((task) => isActive(task.completionDate)), true); // Removes all completed tasks.
  
  // Filters the tasks in the list by whether it is currently active. 
  // It also applies the 'selected' css style to inform the user that
  // the button has been clicked. 
  function filterByActive() {
    const activeTasks = getLocalStorage().filter((task) => isActive(task.completionDate)); // Get all active tasks.
    update(activeTasks, false); // Update the UI with just active tasks.
    highlightAction(1); // Apply the 'selected' css style.
  }
  
  // Filters the tasks in the list by whether it has been completed.
  // The 'selected' css style is applied and all active tasks are filtered
  // out of the UI.
  function filterByCompleted() {
    const completedTasks = getLocalStorage().filter((task) => !isActive(task.completionDate)); // Get all completed tasks.
    update(completedTasks, false); // Update the UI with just completed tasks.
    highlightAction(2); // Apply the 'selected' css style.
  }

  function removeSelected() {
    const unselectedTasks = getLocalStorage().filter((task) => !selectedJobs.has(task.id));
    update(unselectedTasks, true);
    highlightAction(0);
  }
  
  // Job list component that will display of the completed and
  // active tasks that the user has added.
  return (
    <section className='jobList'>
      <div className='view'>
        <p id='numTasks'>{tasks.length} task{(tasks.length !== 1 ? 's' : '')}</p>
        <div className='filters'>
          <ul>
            <li onClick={filterByAll} id='allFilter' className='selected'>All</li>
            <li onClick={filterByActive} id='activeFilter'>Active <div id="activeColour"></div></li>
            <li onClick={filterByCompleted} id='completedFilter'>Completed <div id="completedColour"></div></li>
          </ul>
        </div>
        <button id='deleteTasks' onClick={removeSelected}>Delete Selected</button>
        <button id='clearCompleted' onClick={clearCompleted}>Clear Completed</button>
      </div>
      {tasks.map((job) => {
        return (
          <Job 
            job={job.task} completionDate={job.completionDate}
            key={job.id} removeTask={removeTask}
            id={job.id} isActive={isActive}
            selectedJobs={selectedJobs}
          />
        );
      })}
    </section>
  )
}

export default JobList