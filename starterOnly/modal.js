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
  const getValue = name => e.target[name].value;
  const getChecked = name => e.target[name].checked;
  
  let tabValidation = [];
  let data = [];
  let regexEmail = new RegExp(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/gm);

  formData.map((input) => {

    if (input.className === 'text-control') {
      const value = getValue(input.name);

      if (value.length >= 1) {

        if (input.name === "email") {
          let mail = value.match(regexEmail)
          
          if (mail) {
            tabValidation.push(true);
  
            data.push({
              input: input.name,
              value
            })

            getMsgError(input.name, false)
          } else {
            tabValidation.push(false);

            getMsgError(input.name, true)
          }
        } else {
          tabValidation.push(true);

          data.push({
            input: input.name,
            value
          })

          getMsgError(input.name, false)
        }

      } else {

        tabValidation.push(false);

        getMsgError(input.name, true)
      }

    } else if (input.name === 'location') {
      const check = getChecked(input.id);
      
      if (check) {
        tabValidation.push(true);
        data.push({
          input: input.name,
          value: input.value
        })
      }

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

  if (tabValidation.includes(false)) {
    buttonSubmit.style.background = 'red';
  } else {
    buttonSubmit.style.background = 'green';

    console.log(data);

    setTimeout(() => {
      lauchClosingModal();
    }, 1500)
  }
 
}

