import React, { useState } from 'react';
import '../styles/App.css';
import SearchBar from './SearchBar';
import JobList from './JobList';
import { checkTaskAndDate } from '../scripts/validationChecks';
import { Trie } from '../scripts/taskTrie';

// Trie data structure to allow the user to search for a task.
const trie = new Trie();
const getLocalStorageJSON = () => JSON.parse(localStorage.getItem('tasks'));

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

const fetchResults = (eventRaiser) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const content = eventRaiser.target.value.replace(/ /g, '');
        const suggestions = trie.getSuggestions(content);
        resolve(suggestions);
      }
      catch (Exception) {
        reject(new Error(Exception.message));
      }
    }, 500);
  });
}

function App() {
  // Returns the current tasks that are stored on the browser in local storage.
  // Holds the current state of the 'tasks' array so new data can be rendered onto the page. 
  if (localStorage.getItem('tasks') == null) localStorage.setItem('tasks', JSON.stringify([]));
  const [curTasks, updateState] = useState(getLocalStorageJSON());
  const allTasks = getLocalStorageJSON().map((x) => x.task);

  allTasks.forEach((task) => {
    trie.insertTask(task.toLowerCase())
  });

   // Responsible for re-rendering the tasks on the UI and updating 
  // the local JSON storage for the end user. It will only modify the local
  // storage if one of the actions is removing or adding a task.
  const updateUserTasks = (newTasks, modifyData) => {
    if (modifyData) localStorage.setItem('tasks', JSON.stringify(newTasks));
    updateState(newTasks); // Updates the state of the react component. 
  };

  // This method runs when the user has requested to add a new task to the to do list. 
  // It generates a new id for the task, checks inputs, and re-renders the tasks onto the
  // page with a new task using the 'useState' hook. 
  function addNewTask() {
    let [task, date] = [document.getElementById('taskBox'), document.getElementById('dateBox')]; // User inputs.
    let lastTask = Math.max(...curTasks.map((task) => task.id)) + 1; // Creates a new unique id.
    lastTask = (lastTask === -Infinity) ? 1 : lastTask;
    
    // Validation to ensure that all inputs are valid. 
    if (checkTaskAndDate(task.value.trim(), date.value.trim())) {
      // Calls the 'oldTasks' hook to re-render the component with the new task object.
      const newTasks = [{
        id: lastTask,
        task: task.value,
        completionDate: date.value
      }, ...getLocalStorageJSON()];
      
      // Function called to update the UI and local storage.
      updateUserTasks(newTasks, true);
      trie.insertTask(task.value.toLowerCase());
    }
  }

  async function findTasks(eventRaiser) {
    try {
      const results = await fetchResults(eventRaiser);
      updateUserTasks(getLocalStorageJSON().filter((x) => {
        const task = x.task.replace(/ /g, '');
        return results.has(task);
      }, false));
      highlightAction(0);
    }
    catch (Exception) {
      alert(`Something went wrong: ${Exception}`);
    }
  }
  
  // Main App component that will be rendered.
  return (
    <React.Fragment>
      <header>
          <h1 id='title'>TODO</h1>
          <img src={require('../images/icon-sun.svg').default} id='toggleTheme' alt="Colour theme toggle"/>
      </header>
      <main>
        <h1 id='tasks'>Tasks</h1>
        <SearchBar updateTasks={addNewTask} findTasks={findTasks} />
        <JobList 
          tasks={curTasks} 
          update={updateUserTasks}
          getLocalStorage={getLocalStorageJSON}
          highlightAction={highlightAction}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
