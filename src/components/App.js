import React, { useState } from 'react';
import '../styles/App.css';
import SearchBar from './SearchBar';
import JobList from './JobList';
import { checkTaskAndDate } from '../scripts/validationChecks';

// The main App component for the project. It is responsible for structuring 
// all of its children components on the page. 
function App() {
  // Returns the current tasks that are stored on the browser in local storage.
  const getLocalStorageJSON = () => JSON.parse(localStorage.getItem('tasks'));
  // Holds the current state of the 'tasks' array so new data can be rendered onto the page. 
  if (localStorage.getItem('tasks') == null) localStorage.setItem('tasks', JSON.stringify([]));
  const [curTasks, updateState] = useState(getLocalStorageJSON());

  // This method runs when the user has requested to add a new task to the to do list. 
  // It generates a new id for the task, checks inputs, and re-renders the tasks onto the
  // page with a new task using the 'useState' hook. 
  const addNewTask = () => {
    let [task, date] = [document.getElementById('taskBox'), document.getElementById('dateBox')]; // User inputs.
    let lastTask = Math.max(...curTasks.map((task) => task.id)) + 1; // Creates a new unique id.
    lastTask = (lastTask === -Infinity) ? 1 : lastTask;
    
    // Validation to ensure that all inputs are valid. 
    if (checkTaskAndDate(task, date)) {
      // Calls the 'oldTasks' hook to re-render the component with the new task object.
      const newTasks = [{
        id: lastTask,
        task: task.value,
        completionDate: date.value
      }, ...getLocalStorageJSON()];
      
      // Function called to update the UI and local storage.
      updateUserTasks(newTasks, true);
    }
  };
  
  // Responsible for re-rendering the tasks on the UI and updating 
  // the local JSON storage for the end user. It will only modify the local
  // storage if one of the actions is removing or adding a task.
  const updateUserTasks = (newTasks, modifyData) => {
    if (modifyData) localStorage.setItem('tasks', JSON.stringify(newTasks));
    updateState(newTasks); // Updates the state of the react component. 
  };
  
  // Main App component that will be rendered.
  return (
    <React.Fragment>
      <header>
          <h1 id='title'>TODO</h1>
          <img src={require('../images/icon-sun.svg').default} id='toggleTheme' alt="Colour theme toggle"/>
      </header>
      <main>
        <h1 id='tasks'>Tasks</h1>
        <SearchBar updateTasks={addNewTask} />
        <JobList 
          tasks={curTasks} 
          update={updateUserTasks}
          getLocalStorage={getLocalStorageJSON}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
