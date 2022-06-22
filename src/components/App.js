import React, { useState } from 'react';
import '../styles/App.css';
import SearchBar from './SearchBar';
import JobList from './JobList';
import { checkTaskAndDate } from '../scripts/validationChecks';
import { Trie } from '../scripts/taskTrie';

function App() {
  // Holds the current state of the 'tasks' array so new data can be rendered onto the page. 
  if (localStorage.getItem('tasks') == null) localStorage.setItem('tasks', JSON.stringify([]));
  const [curTasks, updateState] = useState(getLocalStorageJSON());
  const allTasks = getLocalStorageJSON().map((x) => x.task);
  
  // Inserts each task into the trie so the user can search for tasks.
  allTasks.forEach((task) => {
    trie.insertTask(task.toLowerCase())
  });

  // Asynchronous method that will wait for the results to be 
  // recieved from the 'fetchResults' Promise. After it obtains the
  // search results, it will update the UI with those search results
  // so the user can find their task quicker.
  async function findTasks(eventRaiser) {
    try {
      const results = await fetchResults(eventRaiser); // Wait for a result from the Promise.
      updateUserTasks(getLocalStorageJSON().filter((x) => { // Update the UI with the results.
        const task = x.task.replace(/ /g, '');
        return results.has(task);
      }, false));
      highlightAction(0);
    }
    catch (Exception) {
      // Output a message to the user if an error occurs.
      alert(`Something went wrong: ${Exception}`); 
    }
  }

  // Promise that will fetch the results from the trie as the user types
  // out the task that they are looking for. It will return the suggestions
  // gathered by the trie or it will throw an exception if an issue 
  // occurred during the process.
  const fetchResults = (eventRaiser) => {
    return new Promise((resolve, reject) => {
      try {
        const content = eventRaiser.target.value.replace(/ /g, ''); // Remove whitespaces.
        const suggestions = trie.getSuggestions(content); // Obtain search results.
        resolve(suggestions);
      }
      catch (Exception) {
        reject(new Error(Exception.message));
      }
    });
  }

  // This method runs when the user has requested to add a new task to the to do list. 
  // It generates a new id for the task, checks inputs, and re-renders the tasks onto the
  // page with a new task using the 'useState' hook. 
  function addNewTask() {
    let [task, date] = [document.getElementById('taskBox'), document.getElementById('dateBox')]; // User inputs.
    let newID = Math.max(...curTasks.map((task) => task.id)) + 1; // Creates a new unique id.
    newID = (newID === -Infinity) ? 1 : newID;
    
    // Validation to ensure that all inputs are valid. 
    if (checkTaskAndDate(task.value.trim(), date.value.trim())) {
      // Calls the 'oldTasks' hook to re-render the component with the new task object.
      const newTasks = [{
        id: newID,
        task: task.value,
        completionDate: date.value,
      }, ...getLocalStorageJSON()];

      updateUserTasks(newTasks, true); // Update the UI and local storage.
      trie.insertTask(task.value.toLowerCase()); // Insert new task into the trie.
      task.value = date.value = '';
    }
  }

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
          <img src={require('../images/icon-sun.svg').default} id='toggleTheme' alt="Colour theme toggle" onClick={toggleTheme}/>
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

// Trie data structure to allow the user to search for a task.
const trie = new Trie();
// Arrow function that will obtain the latest content in the local storage.
const getLocalStorageJSON = () => JSON.parse(localStorage.getItem('tasks'));

// Method that is responsible for applying the 'selected' css style
// to either the 'all', 'active', or 'completed' filter buttons. It
// will remove the 'selected' css style from the previously clicked filter
// button and apply the style to the new element that was clicked. 
const highlightAction = (index) => {
  const actions = [
    document.getElementById('allFilter'),
    document.getElementById('activeFilter'),
    document.getElementById('completedFilter'),
  ];
  
  // Previous element that had the 'selected' css style.
  const prevElement = actions.find((action) => action.classList.contains('selected'));
  // New element that will have the 'selected' css style applied to it.
  const newElement = actions[index];
  
  // If a previous element was clicked on, remove the 'selected' css style from it.
  if (prevElement != null) prevElement.classList.remove('selected');
  newElement.classList.add('selected');
};

const toggleTheme = () => {
  const toggleImage = document.getElementById('toggleTheme');
  const elements = [
    document.getElementById('findTask'),
    document.getElementById('searchBar'),
    document.querySelector('.view'),
    document.body
  ];

  [...document.querySelector('.filters').children[0].children].forEach((listItem) => {
    if (!listItem.classList.contains('lightModeView')) listItem.classList.add('lightModeView');
    else listItem.classList.remove('lightModeView');
  });

  if (!elements[0].classList.contains('lightPlaceholder')) {
    elements[0].classList.add('lightPlaceholder');
    toggleImage.src = require('../images/icon-moon.svg').default;
  }
  else {
    elements[0].classList.remove('lightPlaceholder');
    toggleImage.src = require('../images/icon-sun.svg').default;
  } 

  elements.forEach((element) => {
    if (element.classList.contains('lightTheme')) element.classList.remove('lightTheme');
    else element.classList.add('lightTheme');
    
    const children = [...element.children];
    children.forEach((child) => {
      let tag = child.tagName.toLowerCase();
      if (tag !== 'button' && tag !== 'div') {
        if (child.classList.contains('lightThemeText')) child.classList.remove('lightThemeText');
        else child.classList.add('lightThemeText');
      }
    });
  });
};