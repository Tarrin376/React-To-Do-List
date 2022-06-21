import React from 'react'
import Job from './Job';
import '../styles/JobList.css';

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

  const filterByAll = () => {
    update(getLocalStorage(), false); // Removes all current filters.
    highlightAction(0);
  }
  
  const isActive = (completionDate) => new Date(completionDate) > new Date(); // Returns a boolean value whether the task is complete or not.
  const clearCompleted = () => update(getLocalStorage().filter((task) => isActive(task.completionDate)), true); // Removes all completed tasks.

  function filterByActive() {
    const activeTasks = getLocalStorage().filter((task) => isActive(task.completionDate));
    update(activeTasks, false);
    highlightAction(1);
  }

  function filterByCompleted() {
    const completedTasks = getLocalStorage().filter((task) => !isActive(task.completionDate));
    update(completedTasks, false);
    highlightAction(2);
  }

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
        <button id='clearCompleted' onClick={clearCompleted}>Clear Completed</button>
      </div>
      {tasks.map((job) => {
        return (
          <Job 
            job={job.task} completionDate={job.completionDate}
            key={job.id} removeTask={removeTask}
            id={job.id} isActive={isActive}
          />
        );
      })}
    </section>
  )
}

export default JobList