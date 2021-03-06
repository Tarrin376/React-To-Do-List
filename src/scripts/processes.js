// This function is used by the App component to validate the
// task and completion date inputs entered by the end user.
// It checks that the task input is not empty and that the
// date input matches the format 'dd/mm/yyyy/'. 
export function checkTaskAndDate(task, completionDate) {
  // UI elements to inform the user of an invalid input for the task. 
  const taskError = document.getElementById('taskError'); 
  const dateError = document.getElementById('dateError');
  let valid = true;

  if (task.length > 0) {
    // Resets content of task warning message.
    taskError.textContent = '';
  }
  else {
    // Outputs task warning message to user. 
    taskError.textContent = 'Please enter a task';
    valid = false;
  }

  if (isValidDate(completionDate)) {
    // Resets content of date warning message.
    dateError.textContent = '';
  }
  else {
    // Outputs date warning message to user. 
    dateError.textContent = 'Date format (dd-mm-yyyy) is required'; 
    valid = false; 
  }

  return valid; 
}

// This function determines whether the date entered by the user is a valid
// date in the format 'dd/mm/yyyy' by using regular expressions and other logic. 
// It returns a boolean value 'true' or 'false' if the date is valid or not.
function isValidDate(dateString)
{
  // Ensure that the date matches the format 'dd/mm/yyyy'.
  if(!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString)) {
    return false;
  }
  
  // Split up the date into sections e.g. day, month, year. 
  const months = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  // Final check to ensure all values are correct.
  return day > 0 && day <= months[month - 1] && month > 0 && month <= 12 
  && year.toString().length === 4 && year < 3000;
};

export let lightEnabled = false;
export const toggleTheme = () => {
  const toggleImage = document.getElementById('toggleTheme');
  const jobs = document.querySelectorAll('.job');
  const numTasks = document.getElementById('numTasks');
  const filters = [...document.querySelector('.filters').children[0].children];

  const elements = [
    document.getElementById('findTask'),
    document.getElementById('searchBar'),
    document.querySelector('.view'),
    document.body
  ];

  filters.forEach((listItem) => {
    if (lightEnabled) listItem.classList.remove('lightModeView');
    else listItem.classList.add('lightModeView');
  });

  jobs.forEach((job) => {
    if (lightEnabled) job.classList.remove('lightJob');
    else job.classList.add('lightJob');
  });

  elements.forEach((element) => {
    if (lightEnabled) element.classList.remove('lightTheme');
    else element.classList.add('lightTheme');
  });

  if (lightEnabled) {
    elements[0].classList.remove('lightPlaceholder');
    toggleImage.src = require('../images/icon-sun.svg').default;
    numTasks.classList.remove('lightThemeText');
    lightEnabled = false;
  }
  else {
    elements[0].classList.add('lightPlaceholder');
    toggleImage.src = require('../images/icon-moon.svg').default;
    numTasks.classList.add('lightThemeText');
    lightEnabled = true;
  }
};