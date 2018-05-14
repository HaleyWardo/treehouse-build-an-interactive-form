// On page load name input is focused on
window.onload = () => document.querySelector('#name').focus();

const title = document.querySelector('#title');
const otherJobTitle = document.querySelector('#other-title');

const design = document.querySelector('#design');
const color = document.querySelector('#color');
const punsShirts = document.querySelector('#punsShirts');
const heartShirts = document.querySelector('#heartShirts');
let heartShirtSelection = false;
let punsShirtSelection = false;

const activitiesContainer = document.querySelector('.activities');
const activities = document.querySelectorAll('input[type="checkbox"]');
let activitySum = 0;
let activitySumHTML = '';

otherJobTitle.style.display = 'none';

// Event listener for job role options
// When job role option is other, display other input field
title.onchange = (e) => {
  otherJobTitle.style.display = 'none';
  const titleValue = e.target.value.toLowerCase();

  if (titleValue === 'other') {
    otherJobTitle.style.display = '';
    otherJobTitle.focus();
  }
}

// Event listener for t-shirt design
design.onchange = (e) => {

  const designValue = e.target.value.toLowerCase();

  if (heartShirtSelection) {
    color.appendChild(punsShirts);
    heartShirtSelection = false;
  } else if (punsShirtSelection) {
    color.appendChild(heartShirts);
    punsShirtSelection = false;
  }

  if (designValue === 'js puns') {
    punsShirtSelection = true;
    heartShirts.remove()
  } else {
    heartShirtSelection = true;
    punsShirts.remove()
  }
}

activitySumHTML = document.createTextNode(`$${activitySum}`);
activitiesContainer.appendChild(activitySumHTML);

// Iterates over each activity checkbox and adds a onchange event
// which calculates the total amount and appends to the DOM
activities.forEach((activity) => {
  activity.onchange = (e) => {
    const activityString = e.target.parentNode.textContent;

    if (e.target.checked) {
      activitySum += parseInt(activityString.split('$').pop());
    } else {
      activitySum -= parseInt(activityString.split('$').pop());
    }

    activitySumHTML.nodeValue = `$${activitySum}`;
  }
});


// Regex to get start/end times in format:
// time[0] = start
// time[1] = end

// activityString.match(/([0-9]|[0-9][0-9])(am|pm)/gmi);


