// On page load name input is focused on
window.onload = () => document.querySelector('#name').focus();

const title = document.querySelector('#title');
const otherJobTitle = document.querySelector('#other-title');

const design = document.querySelector('#design');
let color = document.querySelector('#color');
const punsShirts = document.querySelector('#punsShirts');
const heartShirts = document.querySelector('#heartShirts');
let heartShirtSelection = false;
let punsShirtSelection = false;

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

// const activities = document.querySelectorAll('input[type="checkbox"]');

// for (let i = 0; i < activities.length; i++) {
//   activities[i].onchange = (e) => {
//     let activity = activities[i].parentNode.textContent;
//     let activityCost = activity.replace(/\D/g, "");
//     activityCost = parseInt(activityCost);
//     console.log(activityCost)
//   }
// }
