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
let theme = document.querySelector('#theme');

const inputform = document.querySelectorAll('input');
const legend = document.querySelector('.activities legend');
let activityError = `<div id="activityError">Please select an activity</div>`;
activityErrorMessage = false;

otherJobTitle.style.display = 'none';

/**
 * Event listener for job role options.
 * When job role option is other, display other input field.
 * @param {any} e
 */
titleSelect.onchange = (e) => {
  otherJobTitle.style.display = 'none';
  const titleValue = e.target.value.toLowerCase();

  if (titleValue === 'other') {
    otherJobTitle.style.display = '';
    otherJobTitle.focus();
  }
}

// Sets default design selection
if (designSelect.value === 'Select Theme') {
  punsShirts.remove();
  heartShirts.remove();
  heartShirtSelection = true;
  punsShirtSelection = true;
  color.style.display = 'none';
}

/**
 * Event listener for when the design selection changes
 * @param {any} e
 */
designSelect.onchange = (e) => {
  theme.disabled = true;
  color.style.display = 'inline';
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
    heartShirts.remove();
  } else {
    heartShirtSelection = true;
    punsShirts.remove();
  }
}

activitySumHTML = document.createTextNode(`$${activitySum}`);

/**
 * Iterates over each activity checkbox and adds a onchange event
 * which calculates the total amount and appends to the DOM
 */
activities.forEach((activity) => {
  activity.onchange = (e) => {
    activitiesContainer.appendChild(activitySumHTML);

    const activityString = e.target.parentNode.textContent;
    let activityCost = parseInt(activityString.split('$').pop());

    e.target.checked ? activitySum += activityCost : activitySum -= activityCost;

    activitySumHTML.nodeValue = `$${activitySum}`;

    const timeRegexMatch = activityString.match(/((Tuesday|Wednesday)\s[0-9]|[0-9][0-9])(am-|pm)/gmi);
    let activityTimes = timeRegexMatch ? timeRegexMatch.join('') : null;

    // If no times, return early
    if (!activityTimes) {
      return;
    }

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
if (paymentSelect.value === 'select_method') {
  paypalContainer.style.display = 'none';
  bitcoinContainer.style.display = 'none';
  creditCardContainer.style.display = 'none';
  creditCard = true;
  paypal = true;
  bitcoin = true;
}

let paymentMethod = document.querySelector('#paymentMethod');

/**
 * Event listener for payment selection. Renders elements based on current
 * selection.
 * @param {any} e
 */
paymentSelect.onchange = (e) => {
  paymentMethod.disabled = true;
  let paymentValue = e.target.value;

  let paymentMethodSelection = (method, displayValue, container1, container2, state) => {
    if (method) {
      container1.style.display = displayValue;
      container2.style.display = displayValue;
      method = state;
    }
  }

  paymentMethodSelection(creditCard, 'block', paypalContainer, bitcoinContainer, false);
  paymentMethodSelection(paypal, 'block', creditCardContainer, bitcoinContainer, false);
  paymentMethodSelection(bitcoin, 'block', creditCardContainer, paypalContainer, false);

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
};

/**
 * Submit button event listener. Validates the form inputs and
 * provides error messages.
 */
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let isChecked = document.querySelectorAll('input:checked').length === 0 ? false : true;

  for (i = 0; i < inputform.length; i++) {
    if (inputform[i].value === '') {
      inputform[i].style.border = '2px dashed red';
      inputform[i].placeholder = 'Required';
      // document.documentElement.scrollTop = 0;
    } else {
      inputform[i].style.border = '2px solid #c1deeb';
    }

    if (activityErrorMessage) {
      document.querySelector('#activityError').remove();
      activityErrorMessage = false;
    }
  }

  if (isChecked === false) {
    activitiesContainer.insertAdjacentHTML('afterbegin', activityError);
    activityErrorMessage = true;
  }

  let ccNumber = document.querySelector('#cc-num');
  let zipcode = document.querySelector('#zip');
  let cvv = document.querySelector('#cvv');
  let email = document.querySelector('#mail');

  let ccNumberRegex = /^[0-9]{13,16}$/;
  let zipcodeRegex = /^(\d{5})?$/;
  let cvvRegex = /^(\d{3})?$/;
  let emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/

  let inputFormat = (element, regex, placeholderText) => {
    if (regex.test(element.value) === false) {
      element.value = '';
      element.placeholder = placeholderText;
      element.style.border = '2px dashed red';
    }
  }

  inputFormat(ccNumber, ccNumberRegex, 'Enter 16 digit credit card number');
  inputFormat(zipcode, zipcodeRegex, 'Enter 3 digit');
  inputFormat(cvv, cvvRegex, 'Enter 3 digit');
  inputFormat(email, emailRegex, 'Enter a valid email address');
});
