// On page load name input is focused on
window.onload = () => document.querySelector('#name').focus();

const titleSelect = document.querySelector('#title');
const otherJobTitle = document.querySelector('#other-title');

const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const punsShirts = document.querySelector('#punsShirts');
const heartShirts = document.querySelector('#heartShirts');
let heartShirtSelection = false;
let punsShirtSelection = false;

const activitiesContainer = document.querySelector('.activities');
const activities = document.querySelectorAll('input[type="checkbox"]');
let activitySum = 0;
let activitySumHTML = '';

const paymentSelect = document.querySelector('#payment');
const creditCardContainer = document.querySelector('#credit-card');
const paypalContainer = document.querySelector('#paypal');
const bitcoinContainer = document.querySelector('#bitcoin');

let creditCard = false;
let paypal = false;
let bitcoin = false;

const submitButton = document.querySelector('button');

otherJobTitle.style.display = 'none';

// Event listener for job role options
// When job role option is other, display other input field
titleSelect.onchange = (e) => {
  otherJobTitle.style.display = 'none';
  const titleValue = e.target.value.toLowerCase();

  if (titleValue === 'other') {
    otherJobTitle.style.display = '';
    otherJobTitle.focus();
  }
}

// Event listener for t-shirt design
designSelect.onchange = (e) => {

  const designValue = e.target.value.toLowerCase();

  if (heartShirtSelection) {
    colorSelect.appendChild(punsShirts);
    heartShirtSelection = false;
  } else if (punsShirtSelection) {
    colorSelect.appendChild(heartShirts);
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
    let activityCost = parseInt(activityString.split('$').pop());

    e.target.checked ? activitySum += activityCost : activitySum -= activityCost;

    activitySumHTML.nodeValue = `$${activitySum}`;



    let activityTimes = activityString.match(/((Tuesday|Wednesday)\s[0-9]|[0-9][0-9])(am-|pm)/gmi).join('');

    // Iterates over each activity labels and compares clicked checkbox time
    // with other activity times and disables checkbox if activity is at the
    // same time
    let activityParent = document.querySelectorAll('.activities label');
    for (let i = 0; i < activityParent.length; i++) {
      activityParentForm = activityParent[i].textContent;
      if (activityParentForm.includes(activityTimes)) {
        if (e.target.checked) {
          activityParent[i].firstChild.disabled = true;
          activity.disabled = false;
        } else {
          activityParent[i].firstChild.disabled = false;
        }
      }
    }
  }
});

// Event listener for payment options
// Hides fields that don't pertain to that payment option
paymentSelect.onchange = (e) => {
  let paymentValue = e.target.value;

  if (creditCard) {
    paypalContainer.style.display = 'block';
    bitcoinContainer.style.display = 'block';
    creditCard = false;
  }

  if (paypal) {
    creditCardContainer.style.display = 'block';
    bitcoinContainer.style.display = 'block';
    paypal = false;
  }

  if (bitcoin) {
    creditCardContainer.style.display = 'block';
    paypalContainer.style.display = 'block';
    bitcoin = false;
  }

  switch (paymentValue) {
    case 'credit card' :
      paypalContainer.style.display = 'none';
      bitcoinContainer.style.display = 'none';
      creditCard = true;
      break;
    case 'paypal' :
      creditCardContainer.style.display = 'none';
      bitcoinContainer.style.display = 'none';
      paypal = true;
      break;
    case 'bitcoin' :
      creditCardContainer.style.display = 'none';
      paypalContainer.style.display = 'none';
      bitcoin = true;
      break;
    default :
      break;
  }
}

const inputform = document.querySelectorAll('input');
const legend = document.querySelector('.activities legend');
let activityError = 'Please select an activity';
activityError = document.createTextNode(activityError);

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let isChecked = document.querySelectorAll('input:checked').length === 0 ? false : true;

  for (i = 0; i < inputform.length; i++) {
    if (inputform[i].value === '') {
      inputform[i].style.border = '2px dashed red';
      inputform[i].placeholder = 'Required';
      document.documentElement.scrollTop = 0;
    }
  }

  if (isChecked === false) {
    activitiesContainer.prepend(activityError);
  }
})