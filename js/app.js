// On page load name input is focused on
window.onload = () => document.querySelector('#name').focus();

const title = document.querySelector('#title');
const otherJobTitle = document.querySelector('#other-title');

const design = document.querySelector('#design');

let colorOptions = document.querySelectorAll('#color option');
colorOptions = Array.from(colorOptions);

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

design.onchange = (e) => {
  const designValue = e.target.value.toLowerCase();
  // let a = Array.from(colorOptions).filter(option => option.innerHTML.toLowerCase() && option.innerHTML.toLowerCase().includes(designValue));

  // for (let i = 0; i < colorOptions.length; i++) {
  //   colorOptions[i].style.display = 'inline';

  //   if (designValue === 'js puns' && colorOptions[i].textContent.includes('Puns shirt only')) {
  //     colorOptions[i].style.display = 'inline';
  //   } else {
  //     colorOptions[i].style.display = 'none';
  //   }

  //   if (designValue === 'heart js' && colorOptions[i].textContent.includes('JS shirt only')) {
  //     colorOptions[i].style.display = 'inline';
  //   } else {
  //     colorOptions[i].style.display = 'none';
  //   }

  // }
}