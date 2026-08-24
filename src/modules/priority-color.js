function priorityColor(selectPriority) {
  if (selectPriority.textContent === 'Low') {
    selectPriority.style.color = 'rgb(0, 255, 0)';
  } else if (selectPriority.textContent === 'Medium') {
    selectPriority.style.color = 'orange';
  } else {
    selectPriority.style.color = 'red';
  }
}

function updatePriorityColor(priority) {
  const element = priority.target ? priority.target : priority;
  const value = element.value;

  if (value === 'Low') {
    element.style.color = 'rgb(0, 255, 0)';
  } else if (value === 'Medium') {
    element.style.color = 'orange';
  } else if (value === 'High') {
    element.style.color = 'red';
  }
}

export { priorityColor, updatePriorityColor };
