import React from 'react'
import '../styles/SearchBar.css';
import '../styles/JobList.css';

// Job Component that is utilized by the JobList react component to create a new task requested
// by the user. It will calculate whether the task has been completed or not by calculating today's
// date and comparing it with the completion date specified. This will then by presented to the user
// via coloured circles e.g. 'aqua': active and 'rgb(12, 199, 12)': completed.
function Job(props) {
  // Job component that will be manipulated by the JobsList component.
  return (
    <div className='listItem' id='job'>
        <div className='unticked'>
            <div id='inner'></div>
        </div>
        <div className='jobInfo'>
            <span>{props.job}</span><div id={props.isActive(props.completionDate) ? 'activeColour' : 'completedColour'}></div>
            <span id="completionDate">Completion date: {props.completionDate}</span>
            <img src={require('../images/icon-cross.svg').default} id="removeTask" alt="Delete task" onClick={() => {
              props.removeTask(props.id);
              props.highlightAction(0);
            }}/>
        </div>
    </div>
  );
}

export default Job