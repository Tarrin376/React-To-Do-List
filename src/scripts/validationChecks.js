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
    taskError.textContent = ''; // Resets content of task warning message.
  }
  else {
    taskError.textContent = 'Please enter a task'; // Outputs task warning message to user. 
    valid = false; // Set valid flag to false;
  }

  if (isValidDate(completionDate)) {
    dateError.textContent = ''; // Resets content of date warning message.
  }
  else {
    dateError.textContent = 'Date format (dd/mm/yyyy) is required'; // Outputs date warning message to user. 
    valid = false; // Set valid flag to false;
  }

  return valid; // Return flag.
}

// This function determines whether the date entered by the user is a valid
// date in the format 'dd/mm/yyyy' by using regular expressions and other logic. 
// It returns a boolean value 'true' or 'false' if the date is valid or not.
function isValidDate(dateString)
{
  // Ensure that the date matches the format 'dd/mm/yyyy'.
  if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }
  
  // Split up the date into sections e.g. day, month, year. 
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  if(year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  // Adjust for leap years
  if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  return day > 0 && day <= monthLength[month - 1];
};