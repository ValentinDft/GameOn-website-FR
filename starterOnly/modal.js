function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModal = document.getElementById("close_modal");
const form = document.getElementById("form");
const formData = [...document.querySelectorAll("div.formData > input")];
const buttonSubmit = document.getElementById("btnSubmitForm");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModal.addEventListener("click", lauchClosingModal);
form.addEventListener('submit', submitForm);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function lauchClosingModal() {
  modalbg.style.display = "none";
}

// Click on submit button
function submitForm(e) {
  e.preventDefault();
  const getValue = name => e.target[name].value;
  const getChecked = name => e.target[name].checked;
  
  tabValidation = [];

  formData.map((input) => {

    if (input.className === 'text-control') {
      const value = getValue(input.name);

      if (value.length >= 1) {
        console.log('succes', input.name, value);
        tabValidation.push(true);
      } else {
        console.log('error', input.name, value);
        tabValidation.push(false);
      }

    } else if (input.name === 'location') {
      const check = getChecked(input.id);
      
      if (check) {
        console.log(input.value);
        tabValidation.push(true);
      }

    } else if (input.id === 'checkbox1') {
      const check = getChecked(input.id);
      
      if (check) {
        tabValidation.push(true);
      } else {
        tabValidation.push(false);
      }
    }
  })

  if (tabValidation.includes(false)) {
    buttonSubmit.style.background = 'red';
  } else {
    buttonSubmit.style.background = 'green';
  }
 
}

