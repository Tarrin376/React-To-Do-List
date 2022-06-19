import React from 'react'
import Job from './Job';
import '../styles/JobList.css';

function highlightAction(index) {
  const actions = [
    document.getElementById('allFilter'),
    document.getElementById('activeFilter'),
    document.getElementById('completedFilter'),
  ];
  
  const prevElement = actions.find((action) => action.classList.contains('selected'));
  const newElement = actions[index];
  
  if (prevElement != null) prevElement.classList.remove('selected');
  newElement.classList.add('selected');
}

// JobList react component that is used to render all of the user's completed and
// active tasks. 
function JobList({ tasks, update, getLocalStorage }) {
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
      {tasks.map((job) => {
        return (
          <Job 
            job={job.task} completionDate={job.completionDate}
            key={job.id} removeTask={removeTask}
            id={job.id} isActive={isActive}
            highlightAction={highlightAction}
          />
        );
      })}
      <div className='view'>
        <p>{tasks.length} task{(tasks.length !== 1 ? 's' : '')}</p>
        <div className='filters'>
          <ul>
            <li onClick={filterByAll} id='allFilter'>All</li>
            <li onClick={filterByActive} id='activeFilter'>Active</li>
            <li><div id="activeColour"></div></li>
            <li onClick={filterByCompleted} id='completedFilter'>Completed</li>
            <li><div id="completedColour"></div></li>
          </ul>
        </div>
        <p id='clearCompleted' onClick={clearCompleted}>Clear Completed</p>
      </div>
    </section>
  )
}

export default JobList