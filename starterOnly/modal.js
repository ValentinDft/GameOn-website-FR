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
const spanError = [...document.querySelectorAll(".msgError")];
const modalSuccess = document.querySelector(".modal-success")

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

// get message span error
function getMsgError(inputName, active) {

  spanError.map((value) => {
    if (value.id === `msgError-${inputName}`) {
      active ? value.style.display = "flex" : value.style.display = "none"
    }
  })

}

// Click on submit button
function submitForm(e) {
  e.preventDefault();

  // get value of input text & check input
  const getValue = name => e.target[name].value;
  const getChecked = name => e.target[name].checked;
  
  let tabValidation = [];
  let regexEmail = new RegExp(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/gm);

  // map on all input on div "formData"
  formData.map((input) => {

    // check for input text
    if (input.className === 'text-control') {
      const value = getValue(input.name);

      // check if at least one character specified
      if (value.length >= 1) {

        // specific verif on email & birthdate
        if (input.name === "email") {
          let mail = value.match(regexEmail)
          
          if (mail) {
            tabValidation.push(true);
            getMsgError(input.name, false)
          } else {
            tabValidation.push(false);
            getMsgError(input.name, true)
          }

        } else if (input.name === "birthdate") {
          const date = new Date(value);

          if (date.getFullYear() >= 2007) {
            tabValidation.push(false);
            getMsgError(input.name, true)
          } else {
            tabValidation.push(true);
            getMsgError(input.name, false)
          }
           
        } else {
          tabValidation.push(true);
          getMsgError(input.name, false)
        }

      } else {
        tabValidation.push(false);
        getMsgError(input.name, true)
      }

    // check if input check location
    } else if (input.name === 'location') {
      const check = getChecked(input.id);
      
      if (check) {
        tabValidation.push(true);
      }

    // check if input check conditions
    } else if (input.id === 'checkbox1') {
      const check = getChecked(input.id);
      
      if (check) {
        tabValidation.push(true);
        getMsgError(input.id, false)
      } else {
        tabValidation.push(false);
        getMsgError(input.id, true)
      }
    }
  })

  validationForm(tabValidation)
}

// Validation of the complete form
let validationForm = (tab) => {

  // if tab include only true is success
  if (tab.includes(false)) {
    buttonSubmit.style.background = 'red';
  } else {
    modalbg.style.display = 'none'
    modalSuccess.style.display = 'flex';

    setTimeout(() => {
      resetForm();
    }, 3000)
  }
}

// Reset form when success
let resetForm = () => {
  formData.map((input) => {
    input.name !== 'quantity' ? input.value = '' : input.value = 0;
    input.id !== 'location1' ? input.checked = false : input.checked = true;
    buttonSubmit.style.background = 'red';
    modalSuccess.style.display = 'none';
  })
}

