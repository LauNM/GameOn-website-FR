function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//----------------------------------------------------------------------------------------------------------
// DOM Elements
const modalbg = document.querySelector(".bground");
const registrationForm = document.getElementById("registrationForm");
const confirmationForm = document.getElementById("confirmationForm");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeConfirmation = document.querySelector("#confirmationBtn");
const closeBtn = document.querySelector(".close");

// FORM Elements
const form = document.getElementById('reserve');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdayInput = document.getElementById('birthdate');
const today = new Date();
const quantity = document.getElementById('quantity');
const locationRadios = document.getElementsByName('location');
const terms = document.getElementById('checkbox1');

//REGEX CONSTANTS
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^[0-9]*$/;

//----------------------------------------------------------------------------------------------------------
/*  GENERAL FUNCTIONS  */

//SHOW MODAL
function launchModal() {
    modalbg.style.display = "block";
}

//CLOSE MODAL => RESET FORM, SHOW FORM, HIDE CONFIRMATION MESSAGE AND HIDE MODAL
function closeModal() {
    showRegistration();
    modalbg.style.display = "none";
}

//SHOW FORM AND HIDE CONFIRMATION MESSAGE
function showRegistration() {
    registrationForm.style.display = "block";
    confirmationForm.style.display = "none";
}

//SHOW CONFIRMATION MESSAGE AND HIDE FORM
function showConfirmation() {
    confirmationForm.style.display = "block";
    registrationForm.style.display = "none";
}

//CHECK FOR ERRORS IN FORM
function checkValidity() {

    /*    ForEach input, check if the conditions are respected  */

    //Create variable "isValid" : default value = true, value pass to false if there is at least 1 error
    let isValid = true;

    //Value.length must be > 2
    if (firstName.value.length < 2) {
        firstName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
        firstName.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    if (lastName.value.length < 2) {
        lastName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
        lastName.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    // Check if email is not null and if it's actually an email address
    if (email.value.length < 1 || emailRegex.test(email.value) === false) {
        email.parentElement.setAttribute('data-error', 'Cette adresse mail n\'est pas valide');
        email.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    //Compare birthdate with today's date
    if (new Date(birthdayInput.value) > today) {
        birthdayInput.parentElement.setAttribute('data-error', 'Il n\'est pas possible de donner une date dans le futur');
        birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    //Check if birthdate is given
    if (birthdayInput.value.length < 1) {
        birthdayInput.parentElement.setAttribute('data-error', 'Veuillez renseigner votre date de naissance');
        birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    //Check if quantity is given
    if (quantity.value.length < 1) {
        quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner un nombre de tournois');
        quantity.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    //Check if quantity is a number and if it's > or === to 0
    if (numberRegex.test(quantity.value) === false || Number(quantity.value) < 0) {
        quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner une valeur numérique supérieure ou égale à 0');
        quantity.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    //Check if a city is checked
    let isChecked = false;
    //If one radio box is checked => isChecked === true
    for (let i = 0; i < locationRadios.length; i++) {
        if (locationRadios[i].checked) {
            isChecked = true;
        }
    }
    if (isChecked === false) {
        locationRadios[0].parentElement.setAttribute('data-error', 'Veuillez sélectionner une ville');
        locationRadios[0].parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    //Check if "terms of use" checkbox is checked
    if (!terms.checked) {
        terms.parentElement.setAttribute('data-error', 'Vous devez accepter les conditions d\'utilisation pour valider votre inscription');
        terms.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    return isValid;
}

function radioValue() {
    for (let i = 0; i < locationRadios.length; i++) {
        if (locationRadios[i].checked) {
            return locationRadios[i];
        }
    }
}

//----------------------------------------------------------------------------------------------------------
/*    ADDEVENTLISTENER    */

// Call function submitForm on clic
document.forms[0].addEventListener("submit", submitForm);

// Launch Modal when clicking on "Suscribe"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close Modal when clicking on X
closeBtn.addEventListener("click", closeModal);


//----------------------------------------------------------------------------------------------------------
/*    SUBMIT FORM    */
function submitForm(event) {
    event.preventDefault();

    //Set data-error-visible to false everytime the form is submitted
    formData.forEach(el => el.setAttribute('data-error-visible', 'false'));

    //If checkValidity return true : Close Form and Show Confirmation message
    if (checkValidity()) {
        showConfirmation();
        let results = {
            "prenom": firstName.value,
            "nom": lastName.value,
            "email": email.value,
            "date de naissance": birthdayInput.value,
            "tournois realise(s)": quantity.value,
            "ville choisie": radioValue().value
        }
        form.reset();
        console.log(results);
    } else {
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------
/* CLOSE MODAL AFTER VALIDATION */

//Close Modal and reset form when clicking on "Close" button
closeConfirmation.addEventListener("click", closeModal);
