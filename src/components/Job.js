import React from 'react'
import '../styles/SearchBar.css';
import '../styles/JobList.css';

// Job Component that is utilized by the JobList react component to create a new task requested
// by the user. It will calculate whether the task has been completed or not by calculating today's
// date and comparing it with the completion date specified. This will then by presented to the user
// via coloured circles e.g. 'aqua': active and 'rgb(12, 199, 12)': completed.
function Job(props) {
  const selectElement = (eventRaiser) => {
    const target = eventRaiser.currentTarget;
    if (!target.classList.contains('ticked')) {
      target.classList.add('ticked');
      target.children[0].classList.add('ticked');
    }
    else {
      target.classList.remove('ticked');
      target.children[0].classList.remove('ticked');
    }
  };

  // Job component that will be manipulated by the JobsList component.
  return (
    <div className='listItem' id='job'>
        <div className='unticked' onClick={selectElement}>
            <div id='inner'></div>
        </div>
        <div className='jobInfo'>
            <span>{props.job}</span><div id={props.isActive(props.completionDate) ? 'activeColour' : 'completedColour'}></div>
            <span id="completionDate">Complete by: {props.completionDate}</span>
            <button id='edit'>Edit</button>
            <img src={require('../images/delete.png')} id="removeTask" alt="Delete task" onClick={() => props.removeTask(props.id)}/>
        </div>
    </div>
  );
}

export default Job