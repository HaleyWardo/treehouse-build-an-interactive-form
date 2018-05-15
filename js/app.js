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

/**
 * Validates the input element and sets the styling if
 * in an error state.
 *
 * @param {any} element
 * @param {RegExp} regex
 * @param {String} placeholderText
 * @returns {Boolean} - true if there are errors, otherwise false
 */
const inputFormatValidation = (element, regex, placeholderText) => {
  if (regex.test(element.value) === false) {
    element.value = '';
    element.placeholder = placeholderText;
    element.style.border = '2px dashed red';
    return true;
  } else {
    return false;
  }
};

/**
 * Sets the select previousElementSibling color.
 *
 * @param {any} element
 * @param {String} color
 */
const selectFormatValidation = (element, color = 'red') => {
  element.previousElementSibling.style.color = color;
};

/**
 * Sets the provided element to `display: 'none'`.
 *
 * @param {any} element - HTML Element
 */
const setElementDisplay = (element, value = 'none') => {
  if (element) {
    element.style.display = value;
  }
};

// Hide job title element by default
setElementDisplay(otherJobTitle);

/**
 * Event listener for job role options.
 * When job role option is other, display other input field.
 * @param {any} e
 */
titleSelect.onchange = (e) => {
  setElementDisplay(otherJobTitle);
  const titleValue = e.target.value.toLowerCase();

  if (titleValue === 'other') {
    setElementDisplay(otherJobTitle, '');
    otherJobTitle.focus();
  }
}

// Sets default design selection
if (designSelect.value === 'Select Theme') {
  punsShirts.remove();
  heartShirts.remove();
  heartShirtSelection = true;
  punsShirtSelection = true;
  setElementDisplay(colorSelect);
}

/**
 * Event listener for when the design selection changes
 * @param {any} e
 */
designSelect.onchange = (e) => {
  theme.disabled = true;
  setElementDisplay(colorSelect, 'inline');

  const designValue = e.target.value.toLowerCase();

  if (designValue) {
    selectFormatValidation(designSelect, '#000');
  }

  if (heartShirtSelection) {
    colorSelect.appendChild(punsShirts);
    heartShirtSelection = false;
  }

  if (punsShirtSelection) {
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
    const activityCost = parseInt(activityString.split('$').pop());

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
    const activityParent = document.querySelectorAll('.activities label');
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
  setElementDisplay(paypalContainer);
  setElementDisplay(bitcoinContainer);
  setElementDisplay(creditCardContainer);
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
  const paymentValue = e.target.value;

  if (paymentSelect) {
    selectFormatValidation(paymentSelect, '#000');
  }

  const paymentMethodSelection = (method, displayValue, container1, container2, state) => {
    if (method) {
      setElementDisplay(container1, displayValue);
      setElementDisplay(container2, displayValue);
      method = state;
    }
  }

  paymentMethodSelection(creditCard, 'block', paypalContainer, bitcoinContainer, false);
  paymentMethodSelection(paypal, 'block', creditCardContainer, bitcoinContainer, false);
  paymentMethodSelection(bitcoin, 'block', creditCardContainer, paypalContainer, false);

  switch (paymentValue) {
    case 'credit card' :
      setElementDisplay(paypalContainer);
      setElementDisplay(bitcoinContainer);
      creditCard = true;
      break;
    case 'paypal' :
      setElementDisplay(creditCardContainer);
      setElementDisplay(bitcoinContainer);
      paypal = true;
      break;
    case 'bitcoin' :
      setElementDisplay(creditCardContainer);
      setElementDisplay(paypalContainer);
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
  let errors = [];
  const isChecked = document.querySelectorAll('input:checked').length === 0 ? false : true;

  for (i = 0; i < inputform.length; i++) {
    if (inputform[i].value === '') {
      document.documentElement.scrollTop = 0;
    } else {
      inputform[i].style.border = '2px solid #c1deeb';
    }
  }

  if (activityErrorMessage) {
    document.querySelector('#activityError').remove();
    activityErrorMessage = false;
  }

  if (isChecked === false) {
    activitiesContainer.insertAdjacentHTML('afterbegin', activityError);
    activityErrorMessage = true;
    e.preventDefault();
  }

  const ccNumber = document.querySelector('#cc-num');
  const zipcode = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');
  const email = document.querySelector('#mail');
  const name = document.querySelector('#name');

  errors.push(inputFormatValidation(name, /\S+/, 'Enter your name'));
  errors.push(inputFormatValidation(email, /[^\s@]+@[^\s@]+\.[^\s@]+/, 'Enter a valid email address'));

  if (titleSelect.value === 'other') {
    errors.push(inputFormatValidation(otherJobTitle, /\S+/, 'Enter other job title'));
  }

  if (designSelect.value === 'Select Theme') {
    errors.push(selectFormatValidation(designSelect));
    e.preventDefault();
  } else {
    selectFormatValidation(designSelect, '#000');
  }

  if (paymentSelect.value === 'select_method') {
    errors.push(selectFormatValidation(paymentSelect));
    e.preventDefault();
  } else {
    selectFormatValidation(paymentSelect, '#000');
  }

  if (paymentSelect.value === 'credit card') {
    errors.push(inputFormatValidation(ccNumber, /^[0-9]{13,16}$/, 'Enter 16 digit credit card number'));
    errors.push(inputFormatValidation(zipcode, /^[0-9]{5}$/, 'Enter 5 digit'));
    errors.push(inputFormatValidation(cvv, /^[0-9]{3}$/, 'Enter 3 digit'));
  }

  if (errors.filter((err) => err === true).length > 0) {
    e.preventDefault();
  }
});